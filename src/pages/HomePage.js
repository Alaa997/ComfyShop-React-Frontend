import React, { useEffect, useState } from "react";
import CategorySidebar from "../components/category/CategorySidebar";
import { getProducts } from "../APIs/ProductAPI";
import Slider from "../components/header/Slider";
import ProductCard from "../components/product/ProductCard";
import { Container } from "react-bootstrap";
import TokenManager from "../APIs/TokenManager";

const HomePage = () => {
  // const claims = TokenManager.getClaims().sub;
  // console.log(claims);
  const [products, setProducts] = useState([]);

  const filterProducts = async (categoryId) => {
    const allProducts = await getProducts(categoryId);
    if (allProducts) {
      setProducts(allProducts);
    }
  };

  useEffect(() => {
    filterProducts();
  }, []);

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
            <CategorySidebar filterProducts={filterProducts} />
          </div>
          <div
            style={{
              flex: 3,
              maxWidth: "75%",
            }}
          >
            {/* <ProductList products={products} /> */}
            <div className="col-md-10">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
