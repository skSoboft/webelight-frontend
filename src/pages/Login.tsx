import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice.ts";


const Login = ({ onLogin }) => {
    const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { username, password } = data;

    
    await dispatch(login({ username, password }));
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="p-4 rounded shadow" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="mb-4">Login</h2>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username", { required: true })}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
