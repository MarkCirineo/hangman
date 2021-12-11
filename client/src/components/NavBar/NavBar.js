import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Auth from "../../utils/auth";

const NavBar = () => {

    const [isActive, setIsActive] = useState(false);

    const handleNavOpen = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <nav>
                <div
                    style={{
                        width: isActive ? "100%" : "60px"
                    }}
                >
                    <p 
                        onClick={handleNavOpen}
                        style={{
                            border: isActive ? "0" : "2px #333333 solid",
                            justifyContent: isActive ? "start" : "center",
                            margin: isActive ? "10px 0 0 24px" : "10px 0 0 10px",
                        }}
                    >
                        <i className="fas fa-bars"></i>
                    </p>
                    <ul id="inner"
                        style={{
                            width: isActive ? "calc(100% - 60px)" : "calc(100% + 300px)",
                        }}
                    >
                        <li><Nav.Link as={Link} to="/">Home</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/">Team</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/play">New Game</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/leaderboard">Leaderboards</Nav.Link></li>
                        {Auth.loggedIn() ? (
                            <>
                                <li><Nav.Link as={Link} to="/">Profile</Nav.Link></li>
                                <li><Nav.Link onClick={Auth.logout}>Logout</Nav.Link></li>
                            </>
                        ) : (
                            <>
                                <li><Nav.Link as={Link} to="/login">Login</Nav.Link></li>
                                <li><Nav.Link as={Link} to="/login">Signup</Nav.Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar;