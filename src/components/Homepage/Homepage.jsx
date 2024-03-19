import React, { useEffect, useState, useRef } from 'react';
import logo from '/assets/images/croissantslogo.svg';
import logoText from '/assets/images/DigitalBakers.svg';
import subtitle from '/assets/images/AppsCrafters.svg';
// import './Homepage.css';
import ParticlesComponent from '../ParticlesComponent/ParticlesComponent';

const Homepage = () => {
  const spanRef = useRef(null);

  const [data, setData] = useState();
  const [nameImage, setNameImage] = useState();
  const [subtitleImage, setSubtitleImage] = useState();
  const [logo, setLogo] = useState();
  const [sloganSpan, setSloganSpan] = useState([]);
  const [socialMedias, setSocialMedias] = useState();
  const [currentSpan, setCurrentSpan] = useState(0);

  useEffect(() => {
    fetchComponents();
  }, []);

  async function fetchComponents() {
    try {
      const response = await fetch(
        'http://localhost:1337/api/homepage?populate[0]=nameImage&populate[1]=subtitleImage&populate[2]=logo.image&populate[3]=sloganSpan&populate[4]=socialmedias.socialmedia.image'
      );
      const data = await response.json();
      const arrayData = data.data;
      setData(arrayData);
      setNameImage(arrayData.attributes.nameImage);
      setSubtitleImage(arrayData.attributes.subtitleImage);
      setLogo(arrayData.attributes.logo);
      setSloganSpan(arrayData.attributes.sloganSpan);
      setSocialMedias(arrayData.attributes.socialmedias);
      console.log(arrayData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (sloganSpan.length > 0 && spanRef.current) {
      const interval = setInterval(() => {
        setCurrentSpan((prevSpan) => (prevSpan + 1) % sloganSpan.length);
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [sloganSpan]);

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.textContent = sloganSpan[currentSpan]?.sloganSpan || '';
    }
  }, [currentSpan, sloganSpan]);

  return (
    <>
         {/* <div className='homepage-cta'>
            <button>Voir nos réalisations</button>
          </div> */}
      {socialMedias ? (
        <div className='home-container'>
          <div className='background1'>
          <img src='/assets/images/androidapple.png' alt="" />
          </div>
          
          <div className='homepage-cta'>
          <div className='titlehome'>
            <img src="/assets/images/titrehome.png" alt="" />
            </div>
            <p>Chez Digital Bakers nous réalisons vos projets d'application en véritables artisans<br></br><br></br> Nos recettes d'applications sont élaborées avec les meilleures technologies</p>
            <button>Découvrir nos applis</button>
          </div>
        <div id="home" className="homepage">
            <img className={`img-product-homepage`} src="/assets/images/mockupapplicationclay.png" alt="mobile phone app" />
            <div className="canvas">
            <ParticlesComponent/>
          </div>
          <div className="home-content">
                    <img
                      src={`http://localhost:1337${logo.data.attributes.url}`}
                      className="logo"
                      alt="croissant logo"
                    />
                    <div className="title-container">
                      <div className="main-title">
                        <img
                          src={`http://localhost:1337${nameImage.data.attributes.url}`}
                          className="logo-text"
                          alt="digital bakers"
                        />
                      </div>
                    </div>

                    <div className="main-subtitle">
                      <img
                        src={`http://localhost:1337${subtitleImage.data.attributes.url}`}
                        className="logo-subtitle"
                        alt="apps crafters since 2020"
                      />
                    </div>
                    <button id="craft-app" className="craft-app">
                      <a href="#contact">Craft My App</a>
                    </button>
                    <h3 className='sloganContainer'>
                      {data.attributes.slogan}
                      <span className='slogan2'>{data.attributes.slogan2}</span>
                      {sloganSpan.map((spantext, index) => (
                        <span
                          key={index}
                          ref={spanRef}
                          className={`spantext ${index === currentSpan ? 'activespan' : ''} slide-in-blurred-top-homepage`}
                        >
                          {spantext.sloganSpan}
                        </span>
                      ))}
                    </h3>
            
                      <div className={`socialmedias ${socialMedias[0].style} bloc-social homepage-socialmedia`}>
              {socialMedias[0].socialmedia.map((socialmedia) => (
                <a
                  href={socialmedia.link}
                  className="social-media-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`http://localhost:1337${socialmedia.image.data.attributes.url}`}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
          </div>
          
          </div>
      ) : (
        <p>Loading...</p>
      )}

    </>
  );
};

export default Homepage;
