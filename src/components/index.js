import { Link } from 'react-router';
import FaHome from 'react-icons/lib/fa/home'
import PageMenu from './home/pagemenu';

/*
* Create layout type for router
* - Left: page menu on top
* - Right: page menu on the left
* Also create page not found
*/
export const Left = ({ children }) => 
	<div className="page">
		<PageMenu className="main-menu"/>
		{children}
	</div>

export const Right = ({ children }) => 
	<div className="page">
		{children}
		<PageMenu className="main-menu"/>
	</div>

export const PageNotFound = ({ location }) =>
    <div>
        <h1>Sorry, page cannot be found.</h1>
        <p>Could not find {location.pathname}</p>
		<Link to="/"><FaHome />Home</Link>
    </div>
