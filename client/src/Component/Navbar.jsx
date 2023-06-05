import React from 'react';
import { Menu, Button } from 'antd';

const Navbar = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', background: 'rgb(83, 108, 121)', height: '4rem' }}>
            <Menu mode="horizontal" style={{ minWidth: '400px', background: 'inherit', borderBottom: 'none' }}>
                <Menu.Item key="home" style={{color: 'white'}}>Home</Menu.Item>
                <Menu.Item key="about" style={{color: 'white'}}>About</Menu.Item>
                <Menu.Item key="live" style={{color: 'white'}}>Live</Menu.Item>
                <Menu.Item key="highlight" style={{color: 'white'}}>Highlight</Menu.Item>
                <Menu.Item key="contact" style={{color: 'white'}}>Contact</Menu.Item>
            </Menu>
            <div>
                <Button type="primary" style={{ marginRight: '10px', background: '#00a400' }}>Sign Up</Button>
                <Button type="primary" style={{marginRight: '10px'}}>Login</Button>
                <Button type="primary" style={{marginRight: '10px', background: '#757d77'}}>Login as Admin</Button>
            </div>
        </div>
    );
};

export default Navbar;
