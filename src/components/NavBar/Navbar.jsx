import React from 'react';
import { useState, useEffect } from 'react';
// import './Navbar.css'
import logoNav from '/assets/images/croissantslogo.svg';
import logoText from '/assets/images/DigitalBakers.svg';
import subtitle from '/assets/images/AppsCrafters.svg';
import logomain from '/assets/images/titremenu.png';
import { strapiEndpoint } from '../../config';
import { Link } from 'react-router-dom';

const Navbar = () => {

    useEffect(() => {
        fetchComponents()
    }, [])

    const [menuOpen, setMenuOpen] = useState(false);
    const [links, setLinks]=useState();
    const [section, setSection]=useState();

    function toggleMenu() {
      const icon = document.querySelector('.icon');
      const modalMenu = document.querySelector('.navigation-menu-mobile-container');
      const modaltext = document.querySelectorAll('.navitem')
      icon.classList.toggle("open");
      icon.classList.toggle("indexZ");
      if (menuOpen) {
        modalMenu.classList.add("hidemenu");
        modalMenu.classList.remove("showmenu");
      } else {
        modalMenu.classList.add("showmenu", "slide-in-blurred-top");
        modaltext.forEach (item => {  
              item.classList.add("tracking-in-expand");
            });
        modalMenu.classList.remove("hidemenu");
      }
      setMenuOpen(!menuOpen);
     
    }

    function toggleMenuSelect() {
        const icon = document.querySelector('.icon');
        const modalMenu = document.querySelector('.navigation-menu-mobile-container');
        const modaltext = document.querySelectorAll('.navitem')
        icon.classList.toggle("open");
        icon.classList.toggle("indexZ");
        if (menuOpen) {
          modalMenu.classList.add("hidemenu");
          modalMenu.classList.remove("showmenu");
        } else {
          modalMenu.classList.add("showmenu", "slide-in-blurred-top");
          modaltext.forEach (item => {  
                item.classList.add("tracking-in-expand");
              });
          modalMenu.classList.remove("hidemenu");
        }
        setMenuOpen(!menuOpen);
       
      }

      //lien api pour récupérer le menu ${strapiEndpoint}/api/menu?populate[0]=link.style&populate[1]=dropdownmenu.sections.link

      async function fetchComponents() {
        try {
            const response = await fetch(`${strapiEndpoint}/api/menu?populate[0]=link.style&populate[1]=dropdownmenu.sections.link&populate[2]=link.icon`);
            const data = await response.json();
            //Il faut récupérer le tableau qui est dans l'objet pour pouvoir lui appliquer la méthode Map
            const arrayData = data.data
            setLinks(arrayData.attributes.link)
            setSection(arrayData.attributes.dropdownmenu[0].sections.data[0].attributes)
            console.log(arrayData);
            console.log(arrayData.attributes.dropdownmenu[0].sections.data[0].attributes);
        } catch (error) {
            console.error(error)
        }
    }

    return (
<header>
  {links ? (
    <>
      <ul className='navigation-menu'>
      <div className='main-title-desktop'>
              <img src={logomain} className="logo-text-desktop" alt="digital bakers" />
            </div>
      <li>
          <a href="#agence" className='agence-tab'>{section.label}</a>
          <ul className='under-nav'>
            {section.link.map(link =>
                <li>
                    <a href={`/${link.anchor}`} className="navitem">{link.label}</a>
                </li>
                )}
          </ul>
        </li>
      {links.map((link,index) => {
  if (index !== 0 &&
    link.label !== 'Notre Savoir-Faire' &&
    link.label !== 'Secrets de Fabrication' &&
    link.label !== 'Notre Equipe'
  ) {
    return (
      <li key={link.label}>
        <a href={`/${link.anchor}`} className="navitem">{link.label}</a>
      </li>
    );
  }
  return null; 
})}
       
      </ul>

      <nav className="navbar-mobile">
        <div className="icon nav-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="logo-navbar">
          <img src={logoNav} alt="logo croissant" />
        </div>
        <div className='logo-titles-mobile'>
          <div className='title-container-mobile'>
            <div className='main-title-mobile'>
              <img src={logoText} className="logo-text-mobile" alt="digital bakers" />
            </div>
          </div>
          <div className='main-subtitle-mobile'>
            <img src={subtitle} className="logo-subtitle-mobile" alt="apps crafters since 2020" />
          </div>
        </div>
        <div className='navigation-menu-mobile-container hidemenu'>
          <ul className='navigation-menu-mobile'>
            {links.map(link => (
              <li key={link.label}>
                <a href={`/${link.anchor}`} className="navitem" onClick={toggleMenuSelect}>
                  <img  className="icon-menu-img" src={`${strapiEndpoint}${link.icon.data.attributes.url}`} alt="" />{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  ) : (
    <p>Loading...</p>
  )}
</header>
    );
};

export default Navbar;

// return (
//   <header>
//     {links ? (
//       <>
//         <ul className='navigation-menu'>
//         <li>
//             <a href="#agence" className='agence-tab'>{section.label}</a>
//             <ul className='under-nav'>
//               {section.link.map(link =>
//                   <li>
//                       <a href={`#${link.anchor}`}>{link.label}</a>
//                   </li>
//                   )}
//             </ul>
//           </li>
//         {links.map((link,index) => {
//     if (index !== 0 &&
//       link.label !== 'Notre Savoir-Faire' &&
//       link.label !== 'Secrets de Fabrication' &&
//       link.label !== 'Notre Equipe'
//     ) {
//       return (
//         <li key={link.label}>
//           <a href={`#${link.anchor}`} className="navitem" onClick={toggleMenuSelect}>
//             {link.label}
//           </a>
//         </li>
//       );
//     }
//     return null; 
//   })}
         
//         </ul>
  
//         <nav className="navbar-mobile">
//           <div className="icon nav-icon" onClick={toggleMenu}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//           <div className="logo-navbar">
//             <img src={logoNav} alt="logo croissant" />
//           </div>
//           <div className='logo-titles-mobile'>
//             <div className='title-container-mobile'>
//               <div className='main-title-mobile'>
//                 <img src={logoText} className="logo-text-mobile" alt="digital bakers" />
//               </div>
//             </div>
//             <div className='main-subtitle-mobile'>
//               <img src={subtitle} className="logo-subtitle-mobile" alt="apps crafters since 2020" />
//             </div>
//           </div>
//           <div className='navigation-menu-mobile-container hidemenu'>
//             <ul className='navigation-menu-mobile'>
//               {links.map(link => (
//                 <li key={link.label}>
//                   <a href={`#${link.anchor}`} className="navitem" onClick={toggleMenuSelect}>{link.label}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>
//       </>
//     ) : (
//       <p>Loading...</p>
//     )}
//   </header>
//       );
//   };