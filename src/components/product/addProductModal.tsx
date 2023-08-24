import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/products/productsSlice.ts";
import { useQueryClient } from "react-query";


interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
}

function AddProductModal({ show, onHide }: AddProductModalProps) {
    const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Submitted data:", data);
    dispatch(addProduct(data)); 
    reset();
    onHide(); 
    await queryClient.invalidateQueries("products");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" {...register("name")} />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" step="0.01" {...register("price")} />
          </Form.Group>

          {/* Add other form fields as needed */}

          <Button variant="primary" type="submit" className="mt-3">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddProductModal;
