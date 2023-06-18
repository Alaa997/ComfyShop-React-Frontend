import React, { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register } from "../../APIs/AuthAPI";

function SignUp() {
  const navigate = useNavigate();
  const ref = useRef();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const required = () => {
    let errors = {};

    if (!user.firstName) {
      errors.firstName = "This field is required!";
    } else if (user.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters long!";
    } else if (!/^[A-Za-z]+$/.test(user.firstName)) {
      errors.firstName = "First name should only contain letters!";
    }

    if (!user.lastName) {
      errors.lastName = "This field is required!";
    } else if (user.lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters long!";
    } else if (!/^[A-Za-z]+$/.test(user.lastName)) {
      errors.lastName = "Last name should only contain letters!";
    }

    if (!user.email) {
      errors.email = "This field is required!";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      errors.email = "Invalid email format!";
    }

    if (!user.password) {
      errors.password = "This field is required!";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters long!";
    }

    if (!user.address) {
      errors.address = "This field is required!";
    }

    return errors;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    setErrors(required());

    const errors = Object.values(required());
    if (errors.length === 0) {
      register(user)
        .then((response) => {
            toast.success("Registration successful!");
            ref.current.value = "";
            navigate("/login");
        })
        .catch((error) => {
          toast.error("This email is already taken!");
        });
    }
  };

  return (
    <div className="my-background my-5 card p-3">
      <div>
        <Toaster />
      </div>
      <Container>
        <Form onSubmit={saveUser}>
          <h1 className="text-center">Registration Form</h1>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              name="firstName"
              value={user.firstName}
              placeholder="Enter your first name..."
              onChange={(e) => handleChange(e)}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder="Enter your last name..."
              onChange={(e) => handleChange(e)}
            />
            {errors.lastName && (
              <span className="text-danger">{errors.lastName}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              name="email"
              value={user.email}
              placeholder="Enter your email address"
              onChange={(e) => handleChange(e)}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={ref}
              type="password"
              name="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={(e) => handleChange(e)}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              name="address"
              value={user.address}
              placeholder="Enter your address"
              onChange={(e) => handleChange(e)}
            />
            {errors.address && (
              <span className="text-danger">{errors.address}</span>
            )}
          </Form.Group>
          <Button className="w-100" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
