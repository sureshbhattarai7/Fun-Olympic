import React from 'react'
import { Menu, Button, Image, message } from 'antd';
import logo from './../Images/logo_transparent.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const history = useNavigate();
    const sessiondata = JSON.parse(sessionStorage.getItem('userdetail'));

    const items = [
        {
            key: "1",
            label: "Home",
            onClick: () => {
                history('/home');
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
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: 'rgb(83, 108, 121)',
                height: '4rem',
            }}>

                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <a href='/home'><Image src={logo} alt='logo' style={{
                        width: "50px",
                        height: "55px"
                    }} /> </a>

                    <h6 style={{ color: 'white' }}>
                        <span>
                            <a href='/home' style={{ color: 'white', textDecoration: 'none' }}>Fun Olymp!ck</a>
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
                    {!sessiondata ? null : <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>
                        <span>
                            <a onClick={() => history("/profile")}>Profile</a>
                        </span>
                    </Button>}

                    {!sessiondata ? <div>
                        <Button type="primary" htmlType='submit' style={{
                            marginRight: '10px',
                            background: '#00a400'
                        }}>
                            <span>
                                <a onClick={() => {
                                    history("/signup")
                                }}>Sign Up</a>
                            </span>
                        </Button>

                        <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>
                            <span>
                                <a onClick={() => {
                                    history("/login");
                                }}>Login</a>
                            </span>
                        </Button>
                    </div> : <Button type="primary" htmlType='submit' style={{
                        marginRight: '10px',
                        background: 'grey'
                    }}>
                        <span>
                            <a onClick={() => {

                                history("/login");
                                sessionStorage.clear();
                                message.success('User logged out successfully!');
                            }}>Logout</a>
                        </span>
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
