import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getCategories } from "../../APIs/CategoryAPI";
import { addProduct } from "../../APIs/ProductAPI";

const AddProduct = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    photo: null,
  });

  const getAllCategories = async () => {
    const allCategories = await getCategories();
    allCategories && setCategories(allCategories);
  };

  const required = () => {
    let errors = {};
    if (!product.name) {
      errors.name = "This field is required";
    }
    if (!product.description) {
      errors.description = "This field is required";
    }
    if (!product.price) {
      errors.price = "This field is required";
    }
    return errors;
  };

  const handleInput = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSelectedCategory = (e) => {
    const { id, name } = JSON.parse(e.target.value);
    setSelectedCategory({ id, name });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    const errors = required();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      const productData = new FormData();
      productData.append("name", product.name);
      productData.append("description", product.description);
      productData.append("price", product.price);
      productData.append("quantity", product.quantity);
      productData.append("photo", product.photo);
      productData.append("category", JSON.stringify(selectedCategory));

      try {
        const response = await addProduct(productData);
        if (response.status === 201) {
          toast.success("Successfully created!");
          props.sendMessage({ text: "New Product is added!" });
        } else if (response.status === 400) {
          toast.success("This product already exists.");
        }

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getAllCategories();
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Product</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Product Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={product.name}
                />
                {error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Product Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={product.description}
                />
                {error.description && (
                  <span className="text-danger">{error.description}</span>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Category</b>
                </label>

                <select
                  name="category"
                  onChange={handleSelectedCategory}
                  className="form-control"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={JSON.stringify(category)}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <b>Product Price</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={product.price}
                />
                {error.price && (
                  <span className="text-danger">{error.price}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  <b>Select Product Image</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="photo"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={saveProduct}
              >
                Add Product
              </button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
