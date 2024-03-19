import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import title from '/assets/images/projet.svg';
import './Contact.css'

const Contact = () => {

    useEffect(() => {
        fetchComponents()
    }, [])

    const [ data, setData ] = useState()
    const [ title, setTitle ] = useState()
    const [ socialMedias, setSocialMedias ] = useState()
    const [ callToAction, setCallToAction ] = useState()
    const [ image, setImage ] = useState()


    async function fetchComponents() {
        try {
            const response = await fetch('http://localhost:1337/api/contact-page?populate[0]=image&populate[1]=title.image&populate[2]=title.imagetext&populate[3]=calltoaction.button&populate[4]=socialmedias.socialmedia.image');
            const data = await response.json();
            const arrayData = data.data
           setData(arrayData.attributes)
            setSocialMedias(arrayData.attributes.socialmedias)
            setCallToAction(arrayData.attributes.calltoaction)
            setImage(arrayData.attributes.image)
            setTitle(arrayData.attributes.title)
            console.log(arrayData);
            console.log(arrayData.attributes.socialmedias);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="contact" className='contact'>
            { title ? (
                <>
                  <div className="contact title">
                    <div className='contact-blocks'>
                        <div className='cta-container'>
                            <img src={`http://localhost:1337${title.imagetext.data.attributes.url}`} className="transformed-title title-project-contact" alt="vous avez un projet ?"/>
                            <img className="icon-title  icon-rocket" src={`http://localhost:1337${title.image.data.attributes.url}`} alt="rocket" />
                                <Link to="/formcontact">
                                <button>{callToAction.buttontext}</button>
                                </Link>
                        </div>
                    
                <div className='contact-infos-container'>
                    <div className="contact-us title">
                        {/* <p>{callToAction.slogan}</p> */}
                        <h2 className='section-title'>{data.subtitle}</h2>
                        <p>{data.subtitletext}</p>
                        <img className="icon-title coffee" src={`http://localhost:1337${image.data.attributes.url}`} alt="cafe croissant" />
                    </div>
                    <div className="contact-infos">
                        <p>{data.contactmail}</p>
                        <div className={`socialmedias ${socialMedias[0].style}`}>
                            { socialMedias[0].socialmedia.map(socialmedia => (
                                <a href={`${socialmedia.link}`} className="social-media-link" target='_blank'>
                                    <img src={`http://localhost:1337${socialmedia.image.data.attributes.url}`} alt="" />
                                </a>
                            
                            )
                            )}
                        </div>
                        <p>Notre équipe est disponible de 8h à 18h du lundi au vendredi</p>
                    </div>
                </div>
            </div>
        </div>
        </>
            ) : (
                <p>Loading...</p>
            )}
    </div>
    );
};

export default Contact;