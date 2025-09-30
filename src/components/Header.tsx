    import Image from '../assets/icons8-global-50.png'
    import { useNavigate } from 'react-router-dom';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
    import ThemeButton from "../components/ThemeButton";

    function Header() {

        const navigate = useNavigate();
        const handleClick = () => {
            console.log("clicked")
    sessionStorage.removeItem("username");
    navigate("/"); // Navigate programmatically
  };
        return (
            <>
                <div className='Heading'>
                    <div className='back-button'>

                        <button onClick={handleClick} style={{backgroundColor:'blue'}}><FontAwesomeIcon icon={faArrowLeft} /></button>
                       
                    
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