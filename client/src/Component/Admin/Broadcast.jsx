import React from 'react';
import { Button, Input, Form, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Broadcast = () => {
    const history = useNavigate();

    const { TextArea } = Input;

    const url = "http://127.0.0.1:3000/user/admin/broadcast";
    const Broadcast = async (data) => {
        const response = await axios.post(url, data);
        return response;
    }

    const onfinish = (vals) => {
        Broadcast({
            category: vals.category,
            title: vals.title,
            url: vals.url,
            description: vals.description
        }).then((res) => {
            console.log(res.data.data.broadcast);
            message.success('URL sent successfully!');
        }).catch((error) => {
            console.log(error.response.message);
        })
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#536c79', color: 'white', height: '10vh' }}>
                <a href='/admin' style={{ textDecoration: 'none', color: 'white' }}><h4>Admin Dashboard</h4></a>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button style={{ marginRight: '100px', background: "#D3D3D3" }} onClick={() => history('/admin')}>Users</Button>
                    <Button style={{ marginRight: '100px', background: "#D3D3D3" }} onClick={() => history('/admin/broadcast')}>Broadcast</Button>
                    <Button style={{ background: "#D3D3D3" }} onClick={() => history('/admin/usersmessages')}>User's messages</Button>
                </div>
                <Button type='primary' htmlType='submit' style={{ marginRight: '100px', backgroundColor: 'grey' }}>
                    <span>
                        <a onClick={() => history("/login")}>Logout</a>
                    </span>
                </Button>
            </div>

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


                    <Form name='broadcast' onFinish={onfinish} layout='vertical'
                        style={{
                            justifyContent: 'center',
                        }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        { required: true, message: 'Please enter the category' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                        { required: true, message: 'Please enter the title' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="URL"
                            name="url"
                            rules={[
                                { required: true, message: 'Please enter the URL' },
                                { type: 'url', message: 'Please enter a valid URL' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                { required: true, message: 'Please enter the description' },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item style={{ align: 'center' }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#43bf5a' }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
