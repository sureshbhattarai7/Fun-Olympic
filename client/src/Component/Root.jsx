import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Root = () => {
    return (
        <div>
            <div>
                <Navbar />
                <Outlet style={{ height: 650 }} />
                <Footer />
            </div>
        </div>
    )
}

export default Root