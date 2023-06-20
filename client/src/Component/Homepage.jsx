import React from 'react';
import { Menu, Button, Image } from 'antd';
import logo from './../Images/logo_transparent.png';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {

    const history = useNavigate();
    const items = [
        {
            key: "1",
            label: "Home",
            onClick: () => {
                history('/');
            }
        },
        {
            key: "2",
            label: "About",
            onClick: () => {
                history('/about');
            }
        },
        {
            key: "3",
            label: "Live",
            onClick: () => {
                history('/live');
            }
        },
        {
            key: "4",
            label: "Highlight",
            onClick: () => {
                history('/highlight');
            }
        },
        {
            key: "5",
            label: "Contact",
            onClick: () => {
                history('/contact-us');
            }
        },
        
    ]


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: 'rgb(83, 108, 121)',
            height: '4rem'
        }}>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <a href='/'><Image src={logo} alt='logo' style={{
                    width: "50px",
                    height: "55px"
                }} /> </a>
                
                <h6 style={{ color: 'white' }}>
                    <span>
                        <a href='/' style={{color: 'white', textDecoration: 'none'}}>Fun Olymp!ck</a>
                    </span>
                </h6>
            </div>

            <div>
                <Menu mode="horizontal" style={{
                    minWidth: '400px',
                    background: 'inherit',
                    color: 'white',
                    borderBottom: 'none'
                }} items={items} />

            </div>

            <div>
                <Button type="primary" htmlType='submit' style={{
                    marginRight: '10px',
                    background: '#00a400'
                }}>
                    <span>
                        <a onClick={() => {
                            history("/signup")
                            // console.log(clicked)
                        }}>Sign Up</a>
                    </span>
                </Button>

                <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>
                    <span>
                        <a onClick={() => history("/login")}>Login</a>
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default Homepage;
