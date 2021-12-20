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
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [showUsernameUniqueAlert, setShowUsernameUniqueAlert] = useState(false);
    const [showEmailUniqueAlert, setShowEmailUniqueAlert] = useState(false);

    const [addUser] = useMutation(ADD_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setShowEmailAlert(false);
        setShowPasswordAlert(false);
        setShowUsernameUniqueAlert(false);
        setShowEmailUniqueAlert(false);
        setShowAlert(false);

        if (!/.+@.+\..+/.test(e.target.email.value)) {
            setShowEmailAlert(true);
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.password.value)) {
            setShowPasswordAlert(true);
            return;
        }

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
            if (err.message.split(" ").slice(0, 10).join(" ") === "E11000 duplicate key error collection: hangman.users index: username_1 dup key:") {
                setShowUsernameUniqueAlert(true);
            } else if (err.message.split(" ").slice(0, 10).join(" ") === "E11000 duplicate key error collection: hangman.users index: email_1 dup key:") {
                setShowEmailUniqueAlert(true);
            } else {
                setShowAlert(true);
            }
        }
    };

    return (
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="signup-page container text-white d-flex justify-content-center">
                <div className="signup-container p-5 col-12 col-md-6 col-lg-5">
                    <h3 className="mb-4">Sign Up</h3>
                    <Alert dismissible onClose={() => setShowEmailAlert(false)} show={showEmailAlert} variant="danger">
                        Enter a valid email address!
                    </Alert>
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
                    <Alert dismissible onClose={() => setShowEmailUniqueAlert(false)} show={showEmailUniqueAlert} variant="danger">
                        This email is already in use!
                    </Alert>
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
                    <Alert dismissible onClose={() => setShowUsernameUniqueAlert(false)} show={showUsernameUniqueAlert} variant="danger">
                        This username is already taken!
                    </Alert>
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
                    <Alert dismissible onClose={() => setShowPasswordAlert(false)} show={showPasswordAlert} variant="danger">
                        Password must:
                        <li>Be at least 8 characters</li>
                        <li>Contain at least 1 letter</li>
                        <li>Contain at least 1 number</li>
                    </Alert>
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                        Something went wrong!
                    </Alert>
                    <Button type="submit" className="col-12 mt-3 mb-2 btn btn-primary btn-block">
                        Submit
                    </Button>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/signup">Login</Link>
                    </p>
                </div>
            </Form>
    )
}

export default Signup;