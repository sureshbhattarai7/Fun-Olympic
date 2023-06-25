import React, { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const history = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of registered users from the server
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/user');
                const updatedUsers = response.data.data.users.map(user => ({
                    ...user,
                    enabled: true // Set default value to true
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
            // Update the user's status (enabled/disabled) in the server
            await axios.put(`http://127.0.0.1:3000/user/${userId}`, { enabled });
            // Update the user's status in the local state
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, enabled } : user
                )
            );
        } catch (error) {
            console.error(error);
            // Handle error message display
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
            title: 'Country',
            dataIndex: 'country',
            key: 'country'
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#536c79', color: 'white' }}>
                <a href='/admin' style={{ textDecoration: 'none', color: 'white' }}><h4>Admin Dashboard</h4></a>
                <Button type='primary' htmlType='submit' style={{ marginLeft: '1300px', backgroundColor: 'grey' }}>
                    <span>
                        <a onClick={() => history("/login")}>Logout</a>
                    </span>
                </Button>
            </div>
            <Table style={{background:'#536c79'}} dataSource={users} columns={columns} />

        </div>
    );
};

export default AdminDashboard;
