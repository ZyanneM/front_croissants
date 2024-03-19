import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import ContactFormWrapper from './components/ContactFormWrapper';
import SingleProject from './pages/SingleProject/SingleProject';
import ProductPage from './pages/ProductPage/ProductPage';
import TeamPage from './pages/TeamPage/TeamPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ExpertisePage from './pages/ExpertisePage/ExpertisePage';
import PartenairesPage from './pages/PartenairesPage/PartenairesPage';
import ContactPage from './pages/ContactPage/ContactPage';




function App() {

  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/mainpage" element={<MainPage/>}/>
          <Route path="/home" element={<MainPage/>} />
          <Route path="/services" element={<ServicesPage/>} />
          <Route path="/produits" element={<ProductPage/>} />
          <Route path="/expertise" element={<ExpertisePage/>} />
          <Route path="/equipe" element={<TeamPage/>} />
          <Route path="/partenaires" element={<PartenairesPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/formcontact" element={<ContactFormWrapper/>} />
          <Route path="/produits/project/:id" element={<SingleProject/>} />
          <Route path="/project/:id" element={<SingleProject/>} />
          <Route path="*" element={<MainPage/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
