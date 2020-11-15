import {NavLink} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
    }

    return (
    <nav>
        <div class="nav-wrapper blue darken-1">
            <a href="/" class="brand-logo">Сокращение ссылок</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">My Links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Log Out</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;