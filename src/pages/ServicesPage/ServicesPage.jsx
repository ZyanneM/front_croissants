import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Services from '../../components/SavoirFaire/Services';
import Contact from '../../components/Contact/Contact';

const ServicesPage = () => {
    return (
        <>
            <Navbar/>
            <Services/>
            <Contact/>
        </>
    );
};

export default ServicesPage;