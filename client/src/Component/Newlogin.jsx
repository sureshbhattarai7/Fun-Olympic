import React from 'react'
import { Form, Input, Row, Col, Button, message } from 'antd';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Newlogin = () => {
    const history = useNavigate();
    const url = 'http://localhost:3000/user/login';
    async function Login (data) {
        const response = await axios.post(url, data);
        return response;
    };

    const onfinish = (vals) => {
        Login({
            email: vals.email,
            password: vals.password
        }).then((res) => {
            message.success('User logged in successfully!');
        }).catch((err) => {
            message.error('User logged in failed!');
        });
    };
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
                }}
            >
                {/* <img src={Logo} /> */}
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
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Log in
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <span>
                            Need an account?{" "}
                            <a onClick={()=> history("/signup")}>Sign Up</a>
                        </span>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Newlogin