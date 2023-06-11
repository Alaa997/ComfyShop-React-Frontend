import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../APIs/AuthAPI";

const Login = (props) => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginRequest({ ...loginRequest, [name]: value });
  };
  const [errors, setErrors] = useState({});
  const required = () => {
    let errors = {};

    if (!loginRequest.email) {
      errors.email = "This field is required!";
    }
    if (!loginRequest.password) {
      errors.password = "This field is required!";
    }
    return errors;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setErrors(required());
    const errors = Object.values(required());
    if (errors.length === 0) {
      login(loginRequest);
      navigate("/home/all/product/categories");
      // window.location.reload(true);
    }
  };

  return (
    <div className="my-background my-5 card p-3">
      <Container>
        <Form onSubmit={handleLogin}>
          <h1>Login Form</h1>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={loginRequest.email}
              placeholder="Enter your email..."
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={loginRequest.password}
              placeholder="Enter your password..."
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </Form.Group>
          <Button className="w-100" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
