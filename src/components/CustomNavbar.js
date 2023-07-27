import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Sticky from 'react-stickynode';

class CustomNavbar extends Component {
    render() {
        var {mClass, nClass, cClass, hbtnClass} =this.props;
        return (
            <Sticky top={0} innerZ={9999} activeClass="navbar_fixed">
                <header className="header_area">
                <nav className={`navbar navbar-expand-lg menu_one ${mClass}`}>
                    <div className={`container ${cClass}`}>
                        {/* <Link className={`navbar-brand ${slogo}`} to="/">
                            <img src={require("../img/logo2.png")} alt=""/>
                            <img src={require("../img/logo.png")} alt="logo"/>
                        </Link> */}
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="menu_toggle">
                                <span className="hamburger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <span className="hamburger-cross">
                                    <span></span>
                                    <span></span>
                                </span>
                            </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className={`navbar-nav menu ml-auto ${nClass}`}>
                                <li className="nav-item dropdown submenu mega_menu mega_menu_two">
                                    <Link to="./" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Home
                                    </Link>
                                </li>
                                
                                <li className="dropdown submenu nav-item">
                                    <Link to="./" title="Pages" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Service</Link>
                                    <ul role="menu" className=" dropdown-menu">
                                        <li className="nav-item"><NavLink exact title="Service" className="nav-link" to='/Service'>Service</NavLink></li>
                                        <li className="nav-item"><NavLink exact title="Service Details" className="nav-link" to='/ServiceDetails'>Service Details</NavLink></li>
                                    </ul>
                                </li>
                               
                              
                                <li className="nav-item dropdown submenu">
                                    <a className="nav-link dropdown-toggle" href=".#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Blog
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item"><NavLink to="/Bloglist" className="nav-link">Blog List</NavLink></li>
                                        <li className="nav-item"><NavLink to="/BlogGridPage" className="nav-link">Blog Grid</NavLink></li>
                                        <li className="nav-item"><NavLink to="/BlogSingle" className="nav-link">Blog Single</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><NavLink title="Pricing" className="nav-link" to="/Contact">Contact</NavLink></li>
                            </ul>
                            <a className={`btn_get btn_hover ${hbtnClass}`} href="#get-app">Get Started</a>
                        </div>
                    </div>
                </nav>
                </header>
            </Sticky>
        );
    }
}

export default CustomNavbar;