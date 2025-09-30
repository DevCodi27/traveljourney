import man from '../assets/man.jpg'
import phone from '../assets/phone-call.png';
import email from '../assets/email.png';
function Contact(){     
    return(
        <>
        <div className="contact">
            <article className="contact-card">   
                <img src={man} alt="" />
                     <h3>Mr. Daniel</h3>
                <div className="info-group">
                    <img src={phone} alt="" />
                    <span>+91 75868746389</span>
                </div>
                <div className="info-group">
                    <img src={email} alt="" />
                    <span>daniel@gmail.com</span>
                </div>
               
            </article>
        </div>
            
        </>
    )
}

export default Contact;