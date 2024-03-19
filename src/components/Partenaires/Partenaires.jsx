import React, {useEffect, useState} from 'react';
import title from '/assets/images/partenaires.svg';

const Partenaires = () => {

    useEffect(() => {
        fetchComponents()
    }, [])


    const [ title, setTitle ] = useState()
    const [ clientCards, setClientCards ] = useState()
    const [ content, setContent ] = useState()

    async function fetchComponents() {
        try {
            const url = 'http://localhost:1337/api/clients-page?populate[0]=title.imagetext&populate[1]=clientCard.image';
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = data.data
            setContent(arrayData.attributes);
            setClientCards(arrayData.attributes.clientCard);
            setTitle(arrayData.attributes.title)
            console.log(arrayData);
            // console.log(arrayData.attributes.clientCard[0].image);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="partenaires" className='partenaires'>
    <div className="partenaires title">
      {clientCards ? (
        <>
          <img src={`http://localhost:1337${title.imagetext.data.attributes.url}`} className="transformed-title" alt="ils nous font confiance" />
          <p>{content.slogan}</p>
          <div className='client-cards-container'>
            {clientCards.map(clientCard => (
              <div className="client-card-img" key={clientCard.id}>
                  <img src={`http://localhost:1337${clientCard.image.data.attributes.url}`} alt='' />
              </div>
            ))}
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
        <div className="grid-clients">
            {/* Map on images array */}
        </div>
    </div>
    );
};

export default Partenaires;