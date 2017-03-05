import { Link } from 'react-router';
import FaHome from 'react-icons/lib/fa/home';

/*
* Create `PageMenu` page
* `FaHome` is the `react-icons` library for icons which in this case uses svg to draw icon
*/
const PageMenu = () => {
    return (
        <nav>
            <Link to="/"><FaHome/></Link>
            <Link to="about" 
            	  activeStyle={{
            	  backgroundColor: "white", 
            	  color: "slategray"
            	}}>
            	About
            </Link>
        </nav>
    )
};

export default PageMenu;