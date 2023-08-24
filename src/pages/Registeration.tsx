import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice.ts";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleRegistration = async (data) => {
    const { username, password } = data;

    
    await dispatch(registerUser({ username, password }));
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        className="p-4 rounded shadow"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <h2 className="mb-4">Registration</h2>
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
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
