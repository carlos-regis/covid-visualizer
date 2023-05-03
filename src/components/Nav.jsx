import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sunIcon, moonIcon } from './icons';

function Nav({ theme, toggleTheme }) {
    return (
        <nav className="split">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                }
            >
                Covid Visualizer
            </NavLink>
            <ul className="row">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            'nav-link ' + (isActive ? ' active' : '')
                        }
                    >
                        Stats
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/comparison"
                        className={({ isActive }) =>
                            'nav-link ' + (isActive ? ' active' : '')
                        }
                    >
                        Comparison
                    </NavLink>
                </li>
                <li>
                    <button
                        className="btn secondary icon"
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? moonIcon : sunIcon}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

Nav.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Nav;
