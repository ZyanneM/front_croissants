import React, {useEffect, useState} from 'react';


const Expertise = () => {

    useEffect(() => {
        fetchComponents()
    }, [])

    const [ title, setTitle ] = useState()
    const [ content, setContent ] = useState()
    const [ card, setCard ] = useState()

async function fetchComponents() {
    try {
        const url = 'http://localhost:1337/api/secret-page?populate[0]=title.imagetext&populate[1]=title.image&populate[2]=card.image';
        const response = await fetch(url);
        const data = await response.json();
        const arrayData = data.data
        setContent(arrayData.attributes)
        setTitle(arrayData.attributes.title)
        setCard(arrayData.attributes.card)
        console.log(arrayData.attributes.card);
    } catch (error) {
        console.error(error)
    }
}

return (
  <>
    <div id="expertise" className='expertise'>
      {title ? (
        <>
          <div className="expertise-title">
            <img src={`http://localhost:1337${title.imagetext.data.attributes.url}`} className="transformed-title secret-title-img" alt="secrets de fabrications" />
            {/* <img className="icon-title book-title" src={`http://localhost:1337${title.image.data.attributes.url}`} alt="book" /> */}
          </div>
          <div className='expertise-container'>
            {card.map((secret, index) => (
              <div className={`secret technologies title`} key={index}>
                <h2>{secret.name}</h2>
                <div className={`techno-div ${index === 0 ? 'technoicon' : ''}`}>
                  {secret.image.data.map(technology => (
                    <div className='techno-div-img' key={technology.id}>
                      <img className="techno-icon" src={`http://localhost:1337${technology.attributes.url}`} alt="technology icon" />
                    </div>
                  ))}
                </div>
                <p>{secret.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  </>
);
}

export default Expertise;
