import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createCategory } from "../../APIs/CategoryAPI";

const AddCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const required = () => {
    let errors = {};
    if (!name) {
      errors.name = "This field is required";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = required();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      createCategory({ name: name })
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
      setName("");
    }
  };

  return (
    <div className="card m-5 p-3">
      <Container>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Add new Category</h2>
          <Form.Group className="mb-3">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name category..."
              type="text"
            />
            {error.name && <span className="text-danger">{error.name}</span>}
          </Form.Group>
          <Button
            className="w-100 btn btn-primary"
            variant="primary"
            type="submit"
          >
            Save
          </Button>
          <Toaster />
        </Form>
      </Container>
    </div>
  );
};

export default AddCategory;
