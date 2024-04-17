import React, {useState, useEffect, useRef} from 'react';
import { strapiEndpoint } from '../../config';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';


const SingleProject = () => {

    const { id } = useParams();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [ projectCard, setProjectCard ] = useState();
    const appContainerRefs = useRef([]);


    useEffect(() => {
        fetchProject()
    }, [])

    async function fetchProject() {
        try {
            const url = `${strapiEndpoint}/api/projects/${id}?populate=images&populate=technologies.image&populate=systems.image&populate=appstore.store.image&populate=functionnalities.functionnality`;
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = data.data;
            setProjectCard(arrayData)
            console.log('PROJECT SINGLE',arrayData);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
          <Navbar />
          <div id="single" className="single">
            <div className="single-project-container">
              {projectCard ? (
                <>
                  <h4>{projectCard.attributes.name}</h4>
                  <h5>{projectCard.attributes.subtitle}</h5>
                  <div className="app-container">
                    {projectCard.attributes.images.data.map((imageData, index) => (
                      <div
                        className={`app-img-container-${index} ${
                          index === currentSlide ? "active" : ""
                        }`}
                        key={index}
                        ref={appContainerRefs[index]}
                      >
                        <img
                          className="img-app"
                          src={`${strapiEndpoint}${imageData.attributes.url}`}
                          alt={`${strapiEndpoint}${imageData.attributes.alternativeText}`}
                        />
                        <img
                          className={`img-single-product-${index}`}
                          src="/assets/images/mockupapplication.png"
                          alt="mobile phone app"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="client-infos-container">
                  <div className="dot-container dots-single-page">
                      {projectCard.attributes.images.data.map((imageData, index) => (
                        <div
                          className={`slide-dot ${
                            index === currentSlide ? "active" : ""
                          }`}
                          onClick={() => setCurrentSlide(index)}
                          key={index}
                        ></div>
                      ))}
                    </div>
                    <h4>Le Client</h4>
                    <p>{projectCard.attributes.clientDescription}</p>
                    <h4>Notre Mission</h4>
                    <p>{projectCard.attributes.missionDescription}</p>
                  </div>
                  <div className="details-app-single">
                    <div className="ingredients-title-container">
                      <span className="ingredients-title-1">Les</span>
                      <h6 className="ingredients-title-2">Ingrédients</h6>
                    </div>
                    <div className="ingredients">
                      {projectCard.attributes.technologies.data.map((technoData) => (
                        <img
                          className="techno-icon-ingredient"
                          src={`${strapiEndpoint}${technoData.attributes.image.data.attributes.url}`}
                          alt={`${strapiEndpoint}${technoData.attributes.image.data.attributes.alternativeText}`}
                        />
                      ))}
                    </div>
                    <div className="recette-title-container">
                      <span className="recette-title-1">La</span>
                      <h6 className="recette-title-2">Recette</h6>
                      <div className="app-description">
                        {projectCard.attributes.description}
                      </div>
                      <ul className="recipe-item-list">
                        {projectCard.attributes.functionnalities.map((functionnality) => (
                          <li className="recipe-item">{functionnality.functionnality}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='appstores-container'>
                    {projectCard.attributes.appstore.map(storeData =>
                    <a href={storeData.link} target='blank'>
                        <img className='appstore-img'  src={`${strapiEndpoint}${storeData.store.data.attributes.image.data.attributes.url}`} alt={`${strapiEndpoint}${storeData.store.data.attributes.image.data.attributes.alternativeText}`} />
                    </a>
                        
                        )}

            </div> 
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </>
      );
    }

export default SingleProject;