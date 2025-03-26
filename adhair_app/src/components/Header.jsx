import logo from '../assets/images/logo_white_bg_converted.svg';
import logobg from '../assets/images/logo_black_bg_converted.svg';
import { Link, Outlet } from 'react-router-dom';


const Header = () => {
    return (

      <>
        <header className="bg-gray-800 text-white p-4 text-center text-xl font-bold">
        
        <Link to="Login">
        <img src={logo} className="App_logo" alt="Logo" />
        <img src={logobg} className="App_logobg" alt="Logo" /> 
        </Link>
      </header>
      <Outlet/>
      </>
    );
  };
  
  export default Header;