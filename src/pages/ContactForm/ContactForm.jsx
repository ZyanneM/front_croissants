import React, {useState, useCallback, useEffect} from 'react';
import {
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import DOMPurify from 'dompurify';
import './ContactForm.css'
import { strapiEndpoint } from '../../config';
import axios from 'axios';

const ContactForm = () => {



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("application");
  const [message, setMessage] = useState("");


  const [reCaptchaToken, setReCaptchaToken] = useState("");


  const [errors, setErrors] = useState({});

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

 // Create an event handler so you can call the verification on button click event or form submit
 const handleReCaptchaVerify = useCallback(async () => {
   if (!executeRecaptcha) {
     console.log('Execute recaptcha not yet available');
     return;
    }
    
    const token = await executeRecaptcha('submit_contact_form');
    // Do whatever you want with the token
    setReCaptchaToken(token);
}, [executeRecaptcha]);

useEffect(() => {
  handleReCaptchaVerify();
}, [handleReCaptchaVerify]);


  const handleSubmit = async (e) => {
    e.preventDefault();

  

    let isValidForm = handleValidation();

    if (isValidForm) {
      try {

        const sanitizedName = DOMPurify.sanitize(name);
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedMessage = DOMPurify.sanitize(message);
  

        const response = await axios.post(`${strapiEndpoint}/api/contact-request/createMessage`, {
            name: sanitizedName,
            email: sanitizedEmail,
            subject: subject,
            message: sanitizedMessage,
            reCaptchaToken: reCaptchaToken,
          },
        {
          "Content-Type": "application/json",
        });
    

        console.log('success');
        setShowSuccessMessage(true);
        setShowFailureMessage(false);

        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");

        handleReCaptchaVerify();

      } catch (error) {
        console.log('error');
        setShowSuccessMessage(false);
        setShowFailureMessage(true);

        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
        return;
      }
    }
  };

    return (
        <div className='contact-form-container'>
        <div className="contact-form-title">
            <h6 className='client-project-title'>Parce que votre projet est unique</h6>
            <img className="icon-title-form" src="/assets/images/mobile-project-icon.png" alt="mobile phone with stars" />
            <p className='client-project-p'>Nous élaborons sa recette sur mesure<br></br>Faites-nous part de votre demande</p>
        </div>
        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='contact-form-content'>
            <label htmlFor="name">Nom</label>
            <input 
            type="text" 
            id="name" 
            name='name'
            value={name}
            onChange={(e) => {setName(e.target.value);}}>
            </input>
            {errors?.name && (
            <p>Merci d'entrer votre nom</p>
          )}
            <label htmlFor="email">E-mail</label>
            <input 
            type="text" 
            id="email" 
            name='email'
            value={email}
            onChange={(e) => {setEmail(e.target.value);}}>
            </input>
            {errors?.email && (
            <p>Merci d'entrer votre mail</p>
            )}
            <label htmlFor="subject">Objet</label>
            <select 
            name="subject" 
            id="subject"
            value={subject}
            onChange={handleChange}>
            <option value="application">Projet d'application</option>
            <option value="refonte">Refonte d'application</option>
            <option value="audit">Audit d'application</option>
            <option value="infos">Demande d'informations</option>
            </select>
            {errors?.subject && (
            <p>Merci d'entrer l'objet du message</p>
          )}
            <label htmlFor="message">Votre message</label>
            <textarea 
            name="message" 
            id="message" cols="30" rows="10" placeholder="J'ai besoin d'une application..."
            value={message}
            onChange={(e) => {setMessage(e.target.value);}}></textarea>
            {errors?.message && (
            <p>Message body cannot be empty.</p>
          )}
          </div>
            <button className='btn-form' type='submit'><img className="icon-title-little" src="/assets/images/paperplane-icon.png" alt="paperplane"/>Envoyer</button>
            <div className="text-left">
            {showSuccessMessage && (
              <p className='success-send-msg'>
                Merci ! Votre message a bien été envoyé.
              </p>
            )}
            {showFailureMessage && (
              <p className='error-send-msg'>
                Nous sommes désolés, l'envoi du message a rencontré un problème.
              </p>
            )}
          </div>
        </form>
    </div>
    );
};


export default ContactForm;
