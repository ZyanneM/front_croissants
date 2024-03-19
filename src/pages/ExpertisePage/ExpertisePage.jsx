import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Expertise from '../../components/Expertise/Expertise';
import Contact from '../../components/Contact/Contact';

const ExpertisePage = () => {
    return (
        <>
        <div className="single-expertise-page">
            <Navbar/>
            <Expertise/>
            <Contact/>
        </div>
        </>
    );
};

export default ExpertisePage;