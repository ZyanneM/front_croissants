import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Partenaires from '../../components/Partenaires/Partenaires';
import Contact from '../../components/Contact/Contact';

const PartenairesPage = () => {
    return (
        <>
            <Navbar/>
            <p>De la Start-Up aux Grands-Comptes nous avons accompagné plus de 10 partenaires qui nous recommandent</p>
            <Partenaires/>
            <Contact/>
        </>
    );
};

export default PartenairesPage;