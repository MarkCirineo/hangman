import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [userFormData, setUserFormData] = useState({ email: "", username: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signup-page">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="container text-white d-flex justify-content-center">
                <div className="signup-container p-5 col-12 col-md-6 col-lg-5">
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                        Something went wrong!
                    </Alert>
                    <h3 className="mb-4">Sign Up</h3>

                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            style={{fontFamily: "Helvetica, FontAwesome"}} 
                            placeholder="&#xf003;"
                            value={userFormData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            style={{fontFamily: "Helvetica, FontAwesome"}} 
                            placeholder="&#xf2be;"
                            value={userFormData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            style={{fontFamily: "Helvetica, FontAwesome"}} 
                            placeholder="&#xf023;"
                            value={userFormData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button type="submit" className="col-12 mt-3 mb-2 btn btn-primary btn-block">
                        Submit
                    </Button>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/signup">Login</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default Signup;