import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Space,
  Progress,
  Alert,
} from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Changepass = () => {
  const { id } = useParams();
  const [inputPass, setInputPass] = useState({ inputpassword: "" });
  const [passResponse, setPassResponse] = useState("");

  console.log(id);
  const history = useNavigate();
  //   const [form] = Form.useForm();

  const API = `http://localhost:3001/user/changepassword/${id}`;

  const passwordChange = async (data) => {
    const response = await axios.patch(API, data);
    return response;
  };
  const onfinish = (vals) => {
    console.log(vals);
    passwordChange({
      password: vals.password,
    })
      .then((res) => {
        console.log(res);
        message.success("Password Changed Successfully");
        history("/");
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // form.resetFields();
      });
  };

  return (
    <Row
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
        <Form layout={"vertical"} onFinish={onfinish}>
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Change
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Changepass;
