import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css"

const Login = () => {
    return (
        <div className="login-page">
            <Form className="container text-white d-flex justify-content-center">
                <div className="signin-container p-5 col-11 col-md-6 col-lg-5">
                    <h3 className="mb-4">Sign In</h3>

                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            style={{fontFamily: "FontAwesome"}} 
                            placeholder="&#xf003;"
                            
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            style={{fontFamily: "FontAwesome"}} 
                            placeholder="&#xf023;"
                        />
                    </Form.Group>
                        <Button type="submit" className="col-12 mt-3 mb-2 btn btn-primary btn-block">
                            Submit
                        </Button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    <p className="text-center mt-3">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default Login;
