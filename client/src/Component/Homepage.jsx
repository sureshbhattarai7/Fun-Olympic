import React from 'react';
import { Menu, Button, Image } from 'antd';
import logo from './../Images/logo_transparent.png';

const Homepage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'rgb(83, 108, 121)', height: '4rem' }}>
            <Image src={logo} alt='logo' style={{ width: '120px', height: 'auto' }} />
            <Menu mode="horizontal" style={{ minWidth: '400px', background: 'inherit', borderBottom: 'none' }}>
                <Menu.Item key="home" style={{ color: 'white' }}>Home</Menu.Item>
                <Menu.Item key="about" style={{ color: 'white' }}>About</Menu.Item>
                <Menu.Item key="live" style={{ color: 'white' }}>Live</Menu.Item>
                <Menu.Item key="highlight" style={{ color: 'white' }}>Highlight</Menu.Item>
                <Menu.Item key="contact" style={{ color: 'white' }}>Contact</Menu.Item>
            </Menu>

            <div>
                <Button type="primary" htmlType='submit' style={{ marginRight: '10px', background: '#00a400' }}>
                    <span>
                        <a onClick={() => history("/signup")}>Sign Up</a>
                    </span>
                </Button>

                <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>
                    <span>
                        <a onClick={() => history("/login")}>Login</a>
                    </span>
                </Button>

                <Button type="primary" style={{ marginRight: '10px', background: '#757d77' }}>Login as Admin</Button>
            </div>
        </div>
    );
};

export default Homepage;
