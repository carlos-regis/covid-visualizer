import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';

export default function Nav({ toggleTheme }) {
    return (
        <ThemeConsumer>
            {(theme) => (
                <nav className="split">
                    <NavLink
                        to="/"
                        exact
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
                                exact
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
                                {theme === 'light' ? '🔦' : '💡'}
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </ThemeConsumer>
    );
}
