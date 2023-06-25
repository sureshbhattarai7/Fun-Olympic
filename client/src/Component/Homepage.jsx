import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';


const Homepage = () => {

    return (
        <div>
            <Navbar />
            <Footer />
            <Outlet />

        </div>
    );
};

export default Homepage;
