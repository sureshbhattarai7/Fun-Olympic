import React from 'react';
import {Table, Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersMessages = () => {
    const history = useNavigate();

    const [userMessages, setUserMessages] = useState([]);

    const fetchUserMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/user/contact-us');
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserMessages().then((response) => {
            const mapData = response.data.data.contacts.map((row, index) => ({
                SN: index + 1,
                fullname: row.fullname,
                email: row.email,
                message: row.message
            }))
            setUserMessages(mapData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(userMessages);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
    ];

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#536c79',
                    color: 'white',
                    height: '10vh',
                }}
            >
                <a href="/admin" style={{ textDecoration: 'none', color: 'white' }}>
                    <h4>Admin Dashboard</h4>
                </a>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button
                        style={{ marginRight: '100px', background: '#D3D3D3' }}
                        onClick={() => history('/admin')}
                    >
                        Users
                    </Button>
                    <Button
                        style={{ marginRight: '100px', background: '#D3D3D3' }}
                        onClick={() => history('/admin/broadcast')}
                    >
                        Broadcast
                    </Button>
                    <Button
                        style={{ background: '#D3D3D3' }}
                        onClick={() => history('/admin/usersmessages')}
                    >
                        User's messages
                    </Button>
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: '100px', backgroundColor: 'grey' }}
                >
                    <span>
                        <a onClick={() => history('/login')}>Logout</a>
                    </span>
                </Button>
            </div>

            <div>
                <Table style={{ background: 'rgb(83, 108, 121)'}} dataSource={userMessages} columns={columns} />
            </div>
        </div>
    );
};

export default UsersMessages;
