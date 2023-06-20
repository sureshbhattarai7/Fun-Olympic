import React from 'react';
import { Form, Row, Col, Button, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const history = useNavigate();

    const url = "http://127.0.0.1:3000/user/contact-us";
    const Contact = async (data) => {
        const response = await axios.post(url, data);
        return response;
    };

    const onFinish = (vals) => {
        Contact({
            fullname: vals.fullname,
            email: vals.email,
            message: vals.message
        }).then((res) => {
            console.log(fullname, email, message);
            message.success('Message sent successfully!');
        }).catch((err) => {
            message.warning(err.response);
            console.log(err);
        });
    }
    return (
        <Row
            className='form'
            justify="center"
            style={{
                height: "auto",
                boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.0784313725490196',
                padding: '1em 2em'
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
                <Form onFinish={onFinish} layout='vertical'>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Enter your full name"
                                name="fullname"
                                rules={[{ required: true, message: 'Please enter your full name' }]}>

                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                label="Enter your Email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Enter your Message"
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message!' }]}>
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item style={{ align: 'center' }}>
                        <Button type='primary' htmlType='submit'
                            style={{
                                width: '100%',
                                background: '#43bf5a'
                            }}
                        >
                            <a onClick={() => history('/contact-us')}>Submit</a>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default ContactUs
