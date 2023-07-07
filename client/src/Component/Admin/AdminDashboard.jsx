import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const history = useNavigate();
    const [users, setUsers] = useState([]);
    const sessiondata = JSON.parse(sessionStorage.getItem('userdetail'));


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/user');
                const updatedUsers = response.data.data.users.map(user => ({
                    ...user,
                    // enabled: true // Set default value to true
                }))
                setUsers(response.data.data.users);
                setUsers(updatedUsers)
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleStatusChange = async (userId, enabled) => {
        try {
            // Update the user's status in the server
            await axios.put(`http://127.0.0.1:3000/user/${userId}`, { enabled });
            // Update the user's status in the local state
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, enabled } : user
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const renderSwitch = (enabled, record) => {
        if (record.role === 'admin') {
            // Render a disabled switch for admin accounts
            return <Switch checked={enabled} disabled />;
        }
        return (
            <Switch
                checked={enabled}
                onChange={(checked) => handleStatusChange(record._id, checked)}
            />
        );
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => `${record.firstName} ${record.lastName}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },

        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'role'
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            key: 'enabled',
            render: renderSwitch,

        },
        {
            title: 'Online Status',
            dataIndex: 'online',
            key: 'online',
            render: online => (online ? 'Online' : 'Offline'),
        },
    ];


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
                        <a onClick={() => {
                            history("/login")
                            message.success('Admin logged out successfully!');
                            sessionStorage.clear();
                        }}>Logout</a>
                    </span>
                </Button>
            </div>

            <Table style={{ background: '#536c79' }} dataSource={users} columns={columns} />

        </div>
    );
};

export default AdminDashboard;
