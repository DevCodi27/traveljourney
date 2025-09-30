import Image from '../assets/icons8-global-50.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ThemeButton from "../components/ThemeButton";

function Header() {
    return (
        <>
            <div className='Heading'>
                <div className='back-button'>
                    <Link to={"/"}>
                    <span className='back-button'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                </Link>
                </div>
                <div className='Heading-content'>
                    <img src={Image} alt="" className='logo' />
                <h1 className='title'>My Travel Journey</h1>
                </div>
                <div className='theme-button'>
                    <ThemeButton/>
                </div>
            </div>
        </>
    )
}

export default Header;