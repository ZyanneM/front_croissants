import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { strapiEndpoint } from '../../config';

const Gallery = (props) => {

    const [projects, setProjects] = useState(props.projects);

    return (
      <div className='gallery-container'>
        {projects ? (
        projects.map((project, index) => {
            return (
              <Link className='link-gallery' to={'project/'+project.id}>
                <div className='gallery-card' key={index}>
                  <div className='gallery-img-container'>
                    <img
                      className='gallery-img'
                      src={`${strapiEndpoint}${project.attributes.images.data[0].attributes.url}`}
                      alt={project.attributes.name}
                    />
                  </div>
                  <div className='gallery-project-content'>
                    <p className='gallery-project-subtitle'>{project.attributes.subtitle}</p>
                    <div className='systems'>
                      {project.attributes.systems.data.map(system =>
                        <img className='systems-img' src={`${strapiEndpoint}${system.attributes.image.data.attributes.url}`} alt={system.attributes.name}/>
                      )}
                    </div>
                    <p className='gallery-project-name'>{project.attributes.name}</p>
                  </div>
                </div>
              </Link>
            );
        })
      ) : (
        <p>Loading...</p>
        )}
      </div>
    );
        }

export default Gallery;