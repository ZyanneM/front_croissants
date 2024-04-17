import React, {useState, useEffect, useRef} from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Gallery from '../../components/Gallery/Gallery';
import Contact from '../../components/Contact/Contact';
import { strapiEndpoint } from '../../config';
import { motion } from "framer-motion";

const ProductPage = () => {

    const [ title, setTitle ] = useState()
    const [ projectCards, setProjectCards ] = useState()
    const produitsRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);




    useEffect(() => {
        fetchComponents();
        fetchProjects();
        // setTimeout(scrollToTop, 100);
    }, [])

    async function fetchComponents() {
        try {
            const url = `${strapiEndpoint}/api/product-page?populate[0]=title.imagetext&populate[1]=title.image`;
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
            const url = `${strapiEndpoint}/api/projects?populate=images&populate=technologies.image&populate=systems.image&populate=appstore.store.image`;
            const response = await fetch(url);
            const data = await response.json();
            //Il faut récupérer le tableau qui est dans l'objet pour pouvoir lui appliquer la méthode Map
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
        setIsVisible(scrollTop > 200); // Définissez ici la position de défilement à partir de laquelle l'élément doit apparaître
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    // function scrollToTop() {
    //   produitsRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }

    return (
      <>
        {projectCards ? (
          <>
            <Navbar />
            <div className='single-product-page'>
              <div ref={produitsRef} className="produits title">
                <img src={`${strapiEndpoint}${title.imagetext.data.attributes.url}`} className="transformed-title" alt="nos réalisations" />
                <img className="icon-title" src="/assets/images/realisations-icon.png" alt="mobile phone under cloche" />
                {/* <hr className='lign'/> */}
                <p>Des applications aux pépites d'innovation</p>
              </div>
              <div id="produits" className="produits">
                <Gallery projects={projectCards} />
                <button>Voir plus</button>
              </div>
              <Contact />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
};

export default ProductPage;