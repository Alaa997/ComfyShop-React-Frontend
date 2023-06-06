import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, update } from "../../APIs/ProductAPI";
import { Toaster, toast } from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

useEffect(() => {
  const fetchData = async () => {
    try {
      const selectedProduct = await getProductById(productId);
      setProduct(selectedProduct);
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category
          ? JSON.stringify(selectedProduct.category)
          : "",
        price: selectedProduct.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [productId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product.id,
      name: formData.name,
      description: formData.description,
      category: JSON.parse(formData.category),
      price: formData.price,
    };

    update(productId, updatedProduct)
      .then((res) => {
        console.log(res.status);
        toast.success("Successfully created!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      <div className="my-5 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title text-center">Update Product</h5>
          </div>
          <div className="card-body text-color">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Product Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
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
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Category</b>
                </label>
                <p>{product.category && product.category.name}</p>
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
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update product
              </button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
