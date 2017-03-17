import React from 'react';
import { NavLink } from 'react-router-dom'

function NavRouterLink({ to, children }) {
    // check https://github.com/react-bootstrap/react-router-bootstrap/issues/186
    return (
        <li>
            <NavLink to={to} activeClassName="selected">{children}</NavLink>
        </li>)
}

export default NavRouterLink;