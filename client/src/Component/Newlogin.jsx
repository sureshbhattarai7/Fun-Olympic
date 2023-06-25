import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Button, message } from 'antd';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Newlogin = () => {
    const history = useNavigate();
    const url = 'http://localhost:3000/user/login';

    async function Login(data) {
        const response = await axios.post(url, data);
        return response;
    };

    const onfinish = (vals) => {
        Login({
            email: vals.email,
            password: vals.password
        }).then((res) => {
            history("/");
            message.success('User logged in successfully!');
        }).catch((err) => {
            console.log(err);
            message.error('User logged in failed!');
        });
    };

    function handleCallbackResponse() {
        console.log("Encoded JWT ID token: " + response.credential);
    }

    const initializeGoogleSignIn = () => {
        // Load the Google Sign-In library
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          google.accounts.id.initialize({
            client_id: "672357485286-51lj6snvj005bfd1eo899euduhkevmhn.apps.googleusercontent.com",
            callback: handleCallbackResponse
          });
      
          google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
          );
        };
      
        document.body.appendChild(script);
      };
      
      
        useEffect(() => {
          initializeGoogleSignIn();
        }, []);


    return (
        <Row
            className='form'
            justify="center"
            align="middle"
            style={{
                height: "100vh",
                backgroundColor: "#536c79",
            }}
        >
            <Col
                xs={24}
                sm={18}
                md={16}
                lg={8}
                xl={8}
                xxl={6}
                style={{
                    backgroundColor: "white",
                    boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.0784313725490196)",
                    padding: "1em 2em",
                    borderRadius: "30px"
                }}
            >
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <Form
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                    layout={"vertical"}
                    autoComplete="off"
                    onFinish={onfinish}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Email is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType='submit' style={{ width: "100%" }}>
                            <span>
                                <a onClick={() => history("/")}>Login</a>
                            </span>
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right', color: '#1877f2' }}>
                        <span>
                            <a onClick={() => history("/forgotpassword")}>Forgot Password?</a>
                        </span>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                        <div id='signInDiv'></div>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <span>
                            Need an account?{" "}
                            <a onClick={() => history("/signup")} style={{ color: 'blue' }}>Sign Up</a>
                        </span>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    )
}

export default Newlogin
