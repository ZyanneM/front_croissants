import React, {useEffect, useState} from 'react';
import title from '/assets/images/savoirfaire.svg';
import { motion } from "framer-motion";
// import './Services.css'

const Services = () => {

    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <div id="services" className='services'>
            <div className="services-title title">
                       <motion.img 
                       initial={{ opacity: 0, y: -150 }}
                       animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -150 }}
                       transition={{ duration: 1.2 }}
                       src={title} className="savoir-faire-img" alt="notre savoir-faire"/>
                       {/* <img className="icon-title" src="/assets/images/savoir-faire-icon.png" alt="mobile phone chef" /> */}
                       {/* <hr className='lign'/> */}
                       {/* <p>Des applications avec des vrais morceaux d'innovation</p> */}
            </div>
                <div className='missions-container'>
                <div className="service developpement">
                    <div className='service-img-container'>
                    <img className="service-img" src="/assets/images/applicationsicon.png" alt="mobile phone" />
                    </div>
                    <div className="gradient-title">
                        <h2>Développement d'applications</h2>
                    </div>
                    {/* <p className="marketing-description" >Chez Digital Bakers nous créons et maintenons vos applications mobiles iOs et Android</p>
                    <p className="marketing-description" >Vous avez déjà une appli ?<br></br>Nous l'optimisons</p> */}
                </div>
                <div className="service sdk">
                    <div className='service-img-container'>
                    <img className="service-img" src="/assets/images/sdkicon.png" alt="box" />
                    </div>
                    <div className="gradient-title">
                        <h2>Solutions de Développement</h2>
                    </div>
                    {/* <p>Nous sommes là pour vous aider en intégrant des solutions de développement pour faciliter la prise en main de votre projet ( Intégration SDK )</p>
                 */}
                </div>
                <div className="service audit-conseil">
                    <div className='service-img-container'>
                    <img className="service-img" src="/assets/images/auditicon.png" alt="mobile with android and test image" />
                    </div>
                    <div className="gradient-title">
                        <h2>Audit et Conseil</h2>
                    </div>
                    {/* <p>Soucieux du détail, nos artisans qualifiés vous conseillent</p> */}
                    {/* <ul>
                        <li><img className="chevron" src="/assets/images/chevron.png" alt="chevron"></img>Architecture globale</li>
                        <li><img className="chevron" src="/assets/images/chevron.png" alt="chevron"></img>Qualité du code</li>
                        <li><img className="chevron" src="/assets/images/chevron.png" alt="chevron"></img>Mesure de performance</li>
                    </ul> */}
                </div>
               
                <div className="service missions-test">
                    <div className='service-img-container'>
                    <img className="service-img" src="/assets/images/testicon.png" alt="modern geometric shapes" />
                    </div>
                    <div className="gradient-title">
                        <h2>Missions de Test</h2>
                    </div>
                    {/* <p>Nous mettons notre expertise à votre service</p> */}
                    {/* <ul>
                        <li><img className="chevron" src="/assets/images/chevron.png" alt="chevron"></img>Test d'application</li>
                        <li><img className="chevron" src="/assets/images/chevron.png" alt="chevron"></img>Mise en place de tests automatisés</li>
                    </ul> */}
            </div>
            </div>
        <div className="labels-qualite">
        </div>
    </div>
    );
};

export default Services;