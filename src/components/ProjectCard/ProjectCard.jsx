import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {

const [currentSlide, setCurrentSlide] = useState(0);
const appContainerRefs = props.imagesData.map(() => useRef(null));

    return (
        <>
            <div className='app-title-container'>
                <h4>{props.name}</h4>
                <h5>{props.subtitle}</h5>
                </div>
                <div className='content-app-container'>
                    <div className='app-container'>
                     { props.imagesData.map((imageData, index) =>
                    <>
                        <div className={`app-img-container-${index} ${index === currentSlide ? 'active' : ''} f-img-container `} key={index} ref={appContainerRefs[index]}>
                            <img className={`img-product-${index}`} src="/assets/images/mockupapplication.png" alt="mobile phone app" />
                            <img className= "img-app" src={`http://localhost:1337${imageData.attributes.url}`} alt={`http://localhost:1337${imageData.attributes.alternativeText}`} />
                        </div>
                    </>
                    )}
                        <div className={`dot-container`}>
                             { props.imagesData.map((imageData, index) =>
                            <>
                                    <div className={`slide-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></div>
                            </>
                            )}
                        </div>
                    </div>
            <div className='app-block'>
            <div className='ingredients-title-container'>
                <span className='ingredients-title-1'>Les</span>
                <h6 className='ingredients-title-2'>Ingrédients</h6>
            </div>
            <div className='ingredients'>
                { props.technosData.map(technoData =>
                     <img className= "techno-icon-ingredient" src={`http://localhost:1337${technoData.attributes.image.data.attributes.url}`} alt={`http://localhost:1337${technoData.attributes.image.data.attributes.alternativeText}`} />
                    )}
            </div>
            <div className='recette-title-container'>
                        <span className='recette-title-1'>La</span>
                        <h6 className='recette-title-2'>Recette</h6>
                        <div className='app-description'>{props.description}</div>
                        <ul className='recipe-item-list'>
                    { props.functionnalities.map(functionnality =>
                        <li className='recipe-item'>{functionnality.functionnality}</li>
                        )}
                        </ul>
                    </div>
            <button>
            <Link to={'project/'+props.id}>En savoir plus</Link>
            </button>
            <div className='appstores-container'>
                    {props.storesData.map(storeData =>
                    <a href={storeData.link} target='blank'>
                        <img className='appstore-img'  src={`http://localhost:1337${storeData.store.data.attributes.image.data.attributes.url}`} alt={`http://localhost:1337${storeData.store.data.attributes.image.data.attributes.alternativeText}`} />
                    </a>
                        
                        )}

                                </div> 
                        </div>
                </div>
        </>
    );
};

export default ProjectCard;


// return (
//     <>
//         <div className='app-title-container'>
//             <h4>{props.name}</h4>
//             <h5>{props.subtitle}</h5>
//             </div>
//                 <div className='app-container'>
//                  { props.imagesData.map((imageData, index) =>
//                 <>
//                     <div className={`app-img-container-${index} ${index === currentSlide ? 'active' : ''} f-img-container ${props.index === 0 ? 'div-product1' : ''}`} key={index} ref={appContainerRefs[index]}>
//                         <img className={`img-product-${index}`} src="/assets/images/mockupapplication.png" alt="mobile phone app" />
//                         <img className= "img-app" src={`http://localhost:1337${imageData.attributes.url}`} alt={`http://localhost:1337${imageData.attributes.alternativeText}`} />
//                     </div>
//                 </>
//                 )}
//                 </div>
//         <div className='app-block'>
//         <div className='dot-container'>
//                          { props.imagesData.map((imageData, index) =>
//                         <>
//                                 <div className={`slide-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></div>
//                         </>
//                         )}
//                     </div>
//         <div className='ingredients-title-container'>
//             <span className='ingredients-title-1'>Les</span>
//             <h6 className='ingredients-title-2'>Ingrédients</h6>
//         </div>
//         <div className='ingredients'>
//             { props.technosData.map(technoData =>
//                  <img className= "techno-icon-ingredient" src={`http://localhost:1337${technoData.attributes.image.data.attributes.url}`} alt={`http://localhost:1337${technoData.attributes.image.data.attributes.alternativeText}`} />
//                 )}
//         </div>
//         <div className='recette-title-container'>
//                     <span className='recette-title-1'>La</span>
//                     <h6 className='recette-title-2'>Recette</h6>
//                     <div className='app-description'>{props.description}</div>
//                     <ul className='recipe-item-list'>
//                 { props.functionnalities.map(functionnality =>
//                     <li className='recipe-item'>{functionnality.functionnality}</li>
//                     )}
//                     </ul>
//                 </div>
//         <button>
//         <Link to={'project/'+props.id}>En savoir plus</Link>
//         </button>
//         <div className='appstores-container'>
//                 {props.storesData.map(storeData =>
//                 <a href={storeData.link} target='blank'>
//                     <img className='appstore-img'  src={`http://localhost:1337${storeData.store.data.attributes.image.data.attributes.url}`} alt={`http://localhost:1337${storeData.store.data.attributes.image.data.attributes.alternativeText}`} />
//                 </a>
                    
//                     )}

//         </div> 
//             </div>
//     </>
// );
// };