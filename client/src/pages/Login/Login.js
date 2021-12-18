import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "./Login.css"

const Login = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    
    const [login] = useMutation(LOGIN_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setShowEmailAlert(false);
        setShowAlert(false);

        const form = e.currentTarget;
        if(!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });
            Auth.login(data.login.token);
        } catch (err) {
            if (err.message === "No user found with this email address") {
                setShowEmailAlert(true);
            } else {
                setShowAlert(true);
            }
        }
    };

    return (
        <div className="login-page">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="container text-white d-flex justify-content-center">
                <div className="signin-container p-5 col-11 col-md-6 col-lg-5">
                    <h3 className="mb-4">Sign In</h3>

                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            style={{fontFamily: "Helvetica, FontAwesome"}} 
                            placeholder="&#xf003;"
                            onChange={handleInputChange}
                            value={userFormData.email}
                        />
                    </Form.Group>
                    <Alert dismissible onClose={() => setShowEmailAlert(false)} show={showEmailAlert} variant="danger">
                        No user found with this email address!
                    </Alert>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            style={{fontFamily: "Helvetica, FontAwesome"}} 
                            placeholder="&#xf023;"
                            onChange={handleInputChange}
                            value={userFormData.password}
                        />
                    </Form.Group>
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                        Something went wrong with your login credentials!
                    </Alert>
                    <Button type="submit" className="col-12 mt-3 mb-2 btn btn-primary btn-block">
                        Submit
                    </Button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default Login;
