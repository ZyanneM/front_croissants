import React, {useState, useEffect} from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import Gallery from '../Gallery/Gallery';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Produits = () => {

    const [ title, setTitle ] = useState()
    const [ projectCards, setProjectCards ] = useState()
    const [isVisible, setIsVisible] = useState(false);
    const [isImgVisible, setIsImgVisible] = useState(false);

    useEffect(() => {
        fetchComponents();
        fetchProjects()
    }, [])

    async function fetchComponents() {
        try {
            const url = 'http://localhost:1337/api/product-page?populate[0]=title.imagetext&populate[1]=title.image';
            const response = await fetch(url);
            const data = await response.json();
            //Il faut récupérer le tableau qui est dans l'objet pour pouvoir lui appliquer la méthode Map
            const arrayData = data.data
            setTitle(arrayData.attributes.title)
            console.log('TITLE',arrayData.attributes.title);
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchProjects() {
        try {
            const url = 'http://localhost:1337/api/projects/?populate=images&populate=technologies.image&populate=systems.image&populate=appstore.store.image&populate=functionnalities.functionnality';
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = data.data;
            setProjectCards(arrayData)
            console.log('PROJECTS',arrayData);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY|| document.documentElement.scrollTop;
          setIsVisible(scrollTop > 1000);
          setIsImgVisible(scrollTop > 1400); // Définissez ici la position de défilement à partir de laquelle l'élément doit apparaître
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (
        <div id="produits" className='produits'>
        {projectCards ? (
            <>
            <div className="produits produits-title">
                <motion.img 
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -200 }}
                transition={{ duration: 1.3 }}
                src={`http://localhost:1337${title.imagetext.data.attributes.url}`} className="transformed-title produits-title-transform" alt="nos réalisations"/>
                <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: isImgVisible ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="icon-title icon-title-product" src="/assets/images/realisations-icon.png" alt="mobile phone under cloche" />
            </div>
        {projectCards.slice(0, 3).map((projectCard, index) => (
                  <div className={`div-product${index === 0 ? ' div-product1' : ''}`} key={projectCard.attributes.id}>
            <ProjectCard
            id={projectCard.id}
            index={index}
            name={projectCard.attributes.name}
            subtitle={projectCard.attributes.subtitle}
            imagesData={projectCard.attributes.images.data}
            technosData={projectCard.attributes.technologies.data}
            storesData={projectCard.attributes.appstore}
            description={projectCard.attributes.description}
            functionnalities={projectCard.attributes.functionnalities}
            />
        </div>
            ))}
            <Gallery
            projects={projectCards.slice(0,6)}
            />
            <a href='/produits'>
            <button>Voir plus de projets</button>
            </a>
        </>
      ) : <p>Loading...</p>}
      </div>
    );
};

export default Produits;