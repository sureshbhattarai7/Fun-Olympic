import React, { useState } from 'react';
import { Form, Row, Col, Button, Input, message, Space, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {
    const history = useNavigate();
    const [captcha, setCaptcha] = useState('');
    const [pass, setPass] = useState({ passInput: '' });
    const [passCheck, setPassCheck] = useState('');
    const SITE_KEY = '6LefAyUlAAAAAFz6keTfhYnLAxjo-ROa0_drkCYS'

    const url = "http://127.0.0.1:3000/user/register";
    const Register = async (data) => {
        const response = await axios.post(url, data);
        return response;
    };

    const handleCaptcha = (e) => {
        setCaptcha(e);
    }
    console.log(captcha);

    const passwordChange = (e) => {
        const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

        let passInput = e.target.value;

        setPass({ passInput: e.target.value });

        if (pattern.test(passInput) && passInput.length >= 8) setPassCheck('Strong');
        else setPassCheck('Weak');
        console.log(pass.passInput, passCheck);


    }

    const onfinish = (vals) => {
        Register({
            firstName: vals.firstName,
            lastName: vals.lastName,
            username: vals.username,
            email: vals.email,
            password: vals.password,
            passwordConfirm: vals.confirmPassword,
            captcha
        }).then((res) => {
            history('/login');
            message.success('User registered successfully!');
        }).catch((err) => {
            message.warning(err.response.data.message);
            console.log(err);
        });
    }


    return (
        <Row
            className='form'
            justify="center"
            align="middle"
            style={{
                height: "auto",
                // backgroundColor: "#536c79",
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
                <h1 style={{ textAlign: "center" }}>Sign Up</h1>


                <Form onFinish={onfinish} layout='vertical'>
                    <Row gutter={16}>
                        <Col span={12}>

                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: "Please enter a First Name" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: "Please enter a Last Name" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please enter a Username" }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: "Please enter a country name" }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter a email" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter a Password" }]}
                        onChange={passwordChange}
                    >
                        <Input.Password />
                    </Form.Item>

                    {pass.passInput === '' ? null : passCheck === 'Strong' ? <Space>
                        <Progress
                            type='circle'
                            percent={100}
                            size={30}
                            status='success' /><span style={{ color: 'green' }}> Strong Password </span></Space> : passCheck === 'Weak' ?
                        <Space>
                            <Progress
                                type='circle'
                                percent={30}
                                size={30}
                                status='exception' />
                            <span style={{ color: 'red' }}> Weak Password </span>
                            <div>Password must contain at least 8 characters, at least one uppercase, lowercase, special characters and numbers </div>
                        </Space>
                        : null}
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Password does not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label='Verify'>
                        <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptcha} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            <a onClick={() => history("/login")}>Sign Up</a>
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <span>
                            Already have an account?{" "}
                            <a onClick={() => history("/login")} style={{ color: 'blue' }}>Login</a>
                        </span>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Register

