import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getCategories } from "../../APIs/CategoryAPI";
import { addProduct } from "../../APIs/ProductAPI";

const AddProduct = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    photo: null,
  });

  useEffect(() => {
    getAllCategories();
    return () => {
      // Cleanup code if needed
    };
  }, []);

  const getAllCategories = async () => {
    const allCategories = await getCategories();
    allCategories && setCategories(allCategories);
  };

  const validateInputs = () => {
    let errors = {};

     if (!product.name.trim()) {
       errors.name = "Product Name is required";
     } else if (/^\d/.test(product.name.trim())) {
       errors.name = "Product Name cannot start with a number";
     }

     if (!product.description.trim()) {
       errors.description = "Product Description is required";
     } else if (/^\d/.test(product.description.trim())) {
       errors.description = "Product Description cannot start with a number";
     }

    if (!product.price) {
      errors.price = "Product Price is required";
    } else if (isNaN(product.price) || +product.price <= 0) {
      errors.price = "Product Price must be a positive number";
    }

    if (!selectedCategory.id) {
      errors.category = "Category is required";
    }

    if (!product.photo) {
      errors.photo = "Product Image is required";
    }

    return errors;
  };

  const handleInput = (e) => {
    e.preventDefault();
    setError({ ...error, [e.target.name]: "" }); // Clear the specific error message
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSelectedCategory = (e) => {
    const { id, name } = JSON.parse(e.target.value);
    setSelectedCategory({ id, name });
    setError({ ...error, category: "" }); // Clear the category error message
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
    setError({ ...error, photo: "" }); // Clear the photo error message
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    const errors = validateInputs();
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
          toast.error("This product already exists.");
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
                {error.category && (
                  <span className="text-danger">{error.category}</span>
                )}
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
                  min={1}
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
                {error.photo && (
                  <span className="text-danger">{error.photo}</span>
                )}
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
