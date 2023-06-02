import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../APIs/ProductAPI";

const UpdateProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);

  // useEffect(() => {

  //   const getMyCart = async () => {
  //     const product = await ProductAPI.getProductById(productId);
  //     console.log(product);
  //     setProduct(product)
  //   };

  //   getMyCart();
  // }, []);
  useEffect(() => {
    const getProduct = async () => {
      const selectedProduct = await getProductById(productId);
      console.log(product);
      setProduct(selectedProduct);
    };

    getProduct();
  }, []);
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
                  //   defaultValue={data.name}
                  //   onChange={setFormData}
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
                  //   defaultValue={data.description}
                  //   onChange={setFormData}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Category</b>
                </label>

                <select
                  name="category"
                  //   defaultValue={data.category}
                  className="form-control"
                >
                  {/* <option defaultValue={data.category}>{data.category}</option> */}
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
                  //   defaultValue={data.price}
                  //   onChange={setFormData}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
