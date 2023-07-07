import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, message, Form, Button, Input } from 'antd';

const Profile = () => {
    const { id } = useParams();
    const history = useNavigate();

    const [data, setData] = useState([]);
    const session = JSON.parse(sessionStorage.getItem("userdetail"));

    const callingApi = async () => {
        const response = await axios.get(`http://127.0.0.1:3000/user/profile`);
        return response;
    };

    useEffect(() => {
        if (!session) {
            message.error("You must login first");
            history("/login");
        }
    }, []);

    useEffect(() => {
        callingApi().then((res) => {
            console.log(res);
            setData(res.data.data);
        });
    }, []);

    const handleChangePassword = () => {
        message.success('Password changed successfully!');
    }



    return (
        <div>
            <Form style={{height: '60vh', justifyContent: 'center'}}>
                <Card title="User Profile">
                    {/* <p>Name: {data.name}</p> */}
                    {/* <p>Email: {data.email}</p> */}
                    {/* Render other profile information */}
                    {<p>Name: Suresh Bhattarai</p>}
                    {<p>Email: bhattaraisuresh009@gmail.com</p>}
                    {<p>Username: suresh</p>}
                    {<h5>Update Password:</h5>}
                    {<p>Enter Current Password: </p>}
                    <Input.Password onChange={(e) => setCurrentPassword(e.target.value)} style={{width: '250px'}}/><br/>

                    {<p>Enter New Password: </p>}
                    <Input.Password style={{width: '250px'}} /><br/><br/>

                    <Button onClick={(e)=>{message.success('Password changed successfully!')}} type="primary">Change Password</Button>
                </Card>
            </Form>
        </div>
    )
}

export default Profile
