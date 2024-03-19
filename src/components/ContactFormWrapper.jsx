import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useLocation } from 'react-router-dom';
import ContactForm from '../pages/ContactForm/ContactForm';


const ContactFormWrapper = () => {

  const location = useLocation();
  const isContactFormRoute = location.pathname === '/formcontact';
  const apiKey = import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY;


  if (isContactFormRoute) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={apiKey}>
        <ContactForm/>
      </GoogleReCaptchaProvider>
    );
  }

  return <ContactForm />;
};

export default ContactFormWrapper;