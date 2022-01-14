import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USERS } from "../../utils/queries";
import "./Leaderboard.css";

const Leaderboard = () => {

    const { data, loading } = useQuery(GET_USERS);
    const users = data?.users || [];
    // console.log(loading);
    // console.log(users);

    return (
        <>
            <div className="leaderboard mt-4 py-2 container d-flex flex-wrap text-center justify-content-center">
                <h1 className="col-8">Leaderboard</h1>
                <div className="col-10">
                    <table className="col-12 container justify-content-around">
                        <thead>
                            <tr>
                                <th className="tg-0lax">Name</th>
                                <th className="tg-0lax">Wins</th>
                                <th className="tg-0lax">Losses</th>
                                <th className="tg-0lax">Rating</th>
                                <th className="tg-0lax">Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => {
                                const userLink = `/user/${user.username}`
                                const rating = (user.wins / user.gamesPlayed).toFixed(6);
                                return (
                                    <tr key={i}>
                                        <td className="col-2 tg-0lax py-1"><a href={userLink}>{user.username}</a></td>
                                        <td className="col-2 tg-0lax">{user.wins}</td>
                                        <td className="col-2 tg-0lax">{user.losses}</td>
                                        <td className="col-2 tg-0lax">{rating === "NaN" ? "N/A" : rating}</td>
                                        <td className="col-2 tg-0lax">{user.team ? user.team : "N/A"}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;