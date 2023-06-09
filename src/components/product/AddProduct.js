import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getCategories } from "../../APIs/CategoryAPI";
import { addProduct } from "../../APIs/ProductAPI";
import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:8081/ws",
  debug: function (message) {
    console.log(message);
  },
});
const AddProduct = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [websocketActive, setWebsocketActive] = useState(false); // Track WebSocket connection state

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

  const saveProduct = async (event) => {
    //
    props.sendMessage({ text: "test notification"});
    
    event.preventDefault();

    const errors = required();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      addProduct({
        ...product,
        category: selectedCategory,
      })
        .then((res) => {
          console.log(res.status);
          toast.success("Successfully created!");

          if (websocketActive) {
            client.publish({
              destination: "/topic/notifications",
              body: JSON.stringify({
                text: "A new product has been added!",
              }),
            });
          }

          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
    }
  };

  useEffect(() => {
    getAllCategories();
    return () => {
      // Cleanup code if needed
    };
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8081/ws",
      debug: function (message) {
        console.log(message);
      },
    });

    client.onConnect = (frame) => {
      // WebSocket connection is successful
      console.log("Connected to WebSocket");
    };

    client.onDisconnect = (frame) => {
      // WebSocket connection is disconnected
      console.log("Disconnected from WebSocket");
    };

    client.onWebSocketError = (event) => {
      // WebSocket error occurred
      console.log("WebSocket error:", event);
    };

    if (websocketActive) {
      client.activate();
    }

    return () => {
      client.deactivate();
    };
  }, [websocketActive]);

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
                {error.name && (
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
                {error.name && (
                  <span className="text-danger">{error.price}</span>
                )}
              </div>

              {/* <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  <b> Select Product Image</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="photo"
                  value={product.photo}
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                />
              </div> */}

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
