import React from "react";
import "./Home.css"
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Home = () => {

    const { data } = useQuery(GET_ME);
    const username = data?.me.username || ``;

    const profileLink = `/user/${username}`;

    return (
        <>        
            {Auth.loggedIn() ? (
                <div className="home text-white container d-flex flex-column align-items-center text-center">
                <div className="mt-3">
                    <h1>Welcome {username}</h1>
                </div>
                <div className="home-content mt-2 col-12 justify-content-center d-flex flex-wrap">
                    <Link to="/play" className="col-12 justify-content-center d-flex">
                        <p className="col-lg-6 col-md-8 col-sm-10 col-12">
                            Play now!
                        </p>
                    </Link>
                    <Link to={profileLink} className="col-12 justify-content-center d-flex">
                        <p className="col-lg-6 col-md-8 col-sm-10 col-12">
                            View your profile!
                        </p>
                    </Link>
                </div>
            </div>
            ) : (
                <div className="home text-white container d-flex flex-column align-items-center text-center">
                    <div className="mt-3">
                        <h1>Welcome!</h1>
                    </div>
                    <div className="home-content mt-2 col-12 justify-content-center d-flex flex-wrap">
                        <Link to="/play" className="col-12 justify-content-center d-flex">
                            <p className="col-lg-6 col-md-8 col-sm-10 col-12">
                                Play as guest
                            </p>
                        </Link>
                        <Link to="/login" className="col-12 justify-content-center d-flex">
                            <p className="col-lg-6 col-md-8 col-sm-10 col-12">
                                Sign in to save your scores
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home;