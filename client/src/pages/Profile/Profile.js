import { useQuery } from "@apollo/client";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { GET_ME, GET_USER } from "../../utils/queries";
import "./Profile.css";
import Auth from "../../utils/auth";

const Profile = () => {

    const { username } = useParams();

    const { data } = useQuery(GET_USER, {
        variables: { username }
    });
    const userData = data?.user || {};

    const createdAt = new Date(userData.createdAt / 1).toLocaleString("en-US");

    const { data: currentUser } = useQuery(GET_ME);
    const currentUserData = currentUser?.me || {};

    return (
        <>       
        {data?.user === null ? (
            <div className="container profile d-flex flex-column align-items-center text-center justify-content-evenly">
                <h1>This user does not exist</h1>
            </div>
        ) : (
            <>
            {currentUserData.username === username ? (
                <div className="container profile d-flex flex-column align-items-center text-center justify-content-evenly">
                    <div className="col-10">
                        <h1>{userData.username}</h1>
                    </div>
                    <div className="col-10">
                        <p>Wins: {userData.wins}</p>
                    </div>
                    <div className="col-10">
                        <p>Losses: {userData.losses}</p>
                    </div>
                    <div className="col-10">
                        <p>Games Played: {userData.gamesPlayed}</p>
                    </div>
                    <div className="col-10">
                        <p>Win/Lose Percentage: {userData.winLosePercentage ? userData.winLosePercentage.toFixed(3) : userData.winLosePercentage}%</p>
                    </div>
                    <div className="col-10">
                        <p>Points: {userData.points}</p>
                    </div>
                    <div className="col-10">
                        <p>Rating: {userData.rating ? userData.rating.toFixed(6) : userData.rating}</p>
                    </div>
                    {userData.team === null ? (
                        <div>
                            <p>{userData.username} is not on a team.</p>
                        </div>
                    ) : (
                        <div>
                            <p>Team: {userData.team}</p>
                        </div>
                    )}
                    <div className="col-10">
                        <p>Created: {createdAt}</p>
                    </div>
                    <div className="col-10">
                        <Link onClick={Auth.logout}>Logout</Link>
                        <Link to="/play">Play a game</Link>
                    </div>
                </div>
            ) : (
                <div className="container profile d-flex flex-column align-items-center text-center justify-content-evenly">
                    <div className="col-10">
                        <h1>{userData.username}</h1>
                    </div>
                    <div className="col-10">
                        <p>Wins: {userData.wins}</p>
                    </div>
                    <div className="col-10">
                        <p>Losses: {userData.losses}</p>
                    </div>
                    <div className="col-10">
                        <p>Games Played: {userData.gamesPlayed}</p>
                    </div>
                    <div className="col-10">
                        <p>Win/Loss Percentage: {userData.winLosePercentage ? userData.winLosePercentage.toFixed(3) : userData.winLosePercentage}%</p>
                    </div>
                    <div className="col-10">
                        <p>Points: {userData.points}</p>
                    </div>
                    <div className="col-10">
                        <p>Rating: {userData.rating ? userData.rating.toFixed(6) : userData.rating}</p>
                    </div>
                    {userData.team === null ? (
                        <div>
                            <p>{userData.username} is not on a team.</p>
                        </div>
                    ) : (
                        <div>
                            <p>Team: {userData.team}</p>
                        </div>
                    )}
                    <div className="col-10">
                        <p>Created: {createdAt}</p>
                    </div>
                </div>
            )}
            </>
        )}
        </>
    )
}

export default Profile;