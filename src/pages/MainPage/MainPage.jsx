import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../../components/Homepage/Homepage';
import Services from '../../components/SavoirFaire/Services';
import Navbar from '../../components/NavBar/Navbar';
import Produits from '../../components/Produits/Produits';
import Expertise from '../../components/Expertise/Expertise';
import Equipe from '../../components/Equipe/Equipe';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
import Partenaires from '../../components/Partenaires/Partenaires';
import { useScroll, useTransform, motion } from "framer-motion";
import './MainPage.css'

const MainPage = () => {

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-500, -2500]);

    return (
        <div className='mainpage-container'>
        <Navbar />
        {/* <div className='modale-cookies'>
          Ici on a la recette des croissants mais pas celles des cookies !🍪
        </div> */}
        <Homepage 
        id="home"/>
        
        <Services 
        id="services"/>
        
        <Produits
        id="produits"/>
     
        <Expertise
        id="expertise"/>
        <Equipe
        id="equipe"/>
           
        <Partenaires
        id="partenaires"/>
        <Contact
        id="contact"/>
        <Footer/>
        </div>
    );
};

export default MainPage;