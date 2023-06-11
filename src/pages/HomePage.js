import React, { useEffect, useState } from "react";
import { getProducts } from "../APIs/ProductAPI";
import Slider from "../components/header/Slider";
import ProductCard from "../components/product/ProductCard";
import { Container } from "react-bootstrap";
import CategorySidebar from "../components/category/CategorySidebar";
import { deleteCategory, getCategories } from "../APIs/CategoryAPI";
import { Toaster, toast } from "react-hot-toast";

const HomePage = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const filterProducts = async (categoryId) => {
    const allProducts = await getProducts(categoryId);
    if (allProducts) {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
  };
  const getAllCategories = async () => {
    const allCategories = await getCategories();
    if (allCategories) {
      setCategories(allCategories);
    }
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filteredProducts);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(categoryId)
        .then(() => {
          getAllCategories();
          // toast.success("Successfully removed!");
        })
        .catch((error) => {
          console.log(error);
          // toast.error("Something went wrong!");
        });
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [categories, products]); // Update products when categories change

  return (
    <Container fluid>
      <div className="font" style={{ minHeight: "670px" }}>
        <Slider />
        <div
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: "25%",
            }}
          >
            <CategorySidebar
              filterProducts={filterProducts}
              handleDeleteCategory={handleDeleteCategory}
              categories={categories}
            />
          </div>
          <div
            style={{
              flex: 3,
              maxWidth: "75%",
            }}
          >
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search products..."
            />
            <div className="col-md-10">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Toaster position="top-right" /> */}
    </Container>
  );
};

export default HomePage;
