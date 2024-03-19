import React from 'react';
import { useState, useEffect } from 'react';
import title from '/assets/images/artisans.svg';
// import './Equipe.css'

const Equipe = () => {

    useEffect(() => {
        fetchComponents()
    }, [])


    const [ title, setTitle ] = useState()
    const [ profileCards, setProfileCards ] = useState()

    async function fetchComponents() {
        try {
            const response = await fetch('http://localhost:1337/api/team-page?populate[0]=title.imagetext&populate[1]=card.image');
            const data = await response.json();
            //Il faut récupérer le tableau qui est dans l'objet pour pouvoir lui appliquer la méthode Map
            const arrayData = data.data
            setProfileCards(arrayData.attributes.card)
            setTitle(arrayData.attributes.title)
            console.log(arrayData);
            console.log(arrayData.attributes.card);
        } catch (error) {
            console.error(error)
        }
    }
          
    return (
        <>
            <div id="equipe" className='equipe'>
                <div className="equipe title">
                    
                    {profileCards ? (
                        <>
                            <img src={`http://localhost:1337${title.imagetext.data.attributes.url}`} className="transformed-title" alt="nos artisans développeurs" />
                            {/* <hr className='lign' /> */}
                            <p>Labellisés meilleurs ouvriers du code</p>
                            <div className='team-cards-container'>
                                {profileCards.map(profileCard => (
                                    <div className="profile-card" key={profileCard.id}>
                                        <div className='team-card-img'>
                                            <img src={`http://localhost:1337${profileCard.image.data.attributes.url}`} alt='' />
                                        </div>
                                        <div className='team-card-name'>{profileCard.name}</div>
                                        <div className='team-card-job'>{profileCard.job}</div>
                                        <div className='team-card-description'>{profileCard.description}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
    };
    
    export default Equipe;
    