import React from 'react';
import { Form, Button, Input, message } from 'antd';
import logo from './../Images/logo_transparent.png';

const ForgotPassword = () => {
    const onFinish = async (values) => {
        try {
            const response = await axios.post('/forgotpassword', values);
            message.success(response.data.message);
        } catch (error) {
            message.error('Error sending OTP');
        }
    }
    return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'center',
            boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.0784313725490196',
        }}>
            <a href='/'>
                <img src={logo} alt="Logo" style={{ width: '5em', height: '5em' }} />
            </a>
            <br /> <br /> 
            

            <h3>Forgot Password!</h3><br />
            <p>Enter your email and check your inbox!</p><br/>
            <Form onFinish={onFinish}>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: [true, 'Enter your email!'] },
                        { type: ['email', 'Please enter a valid email!'] }
                    ]}
                >
                    <Input />

                </Form.Item>


                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{textAlign: 'center', marginLeft: '40px'}}>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword