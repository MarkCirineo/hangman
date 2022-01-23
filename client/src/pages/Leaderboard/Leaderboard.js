import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { GET_USERS } from "../../utils/queries";
import "./Leaderboard.css";

const Leaderboard = () => {

    const { data } = useQuery(GET_USERS);
    const users = data?.users || [];
    const [sortConfig, setSortConfig] = useState({ key: "rating", direction: "descending" });
    let sortedUsers = [...users];
    useMemo(() => {
        sortedUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
        return sortedUsers;
    }, [users, sortConfig]);

    
    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    }

    return (
        <>
            <div className="leaderboard mt-4 py-2 container d-flex flex-wrap text-center justify-content-center">
                <h1 className="col-8 pt-1 pb-2">Leaderboard</h1>
                <div className="col-10">
                    <table className="col-12 container justify-content-around">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort("username")}>Name</th>
                                <th onClick={() => requestSort("wins")}>Wins</th>
                                <th onClick={() => requestSort("losses")}>Losses</th>
                                <th onClick={() => requestSort("gamesPlayed")}>Games Played</th>
                                <th onClick={() => requestSort("winLosePercentage")}>Win/Loss Percentage</th>
                                <th onClick={() => requestSort("points")}>Points</th>
                                <th onClick={() => requestSort("rating")}>Rating</th>
                                <th onClick={() => requestSort("team")}>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user, i) => {
                                const userLink = `/user/${user.username}`;
                                return (
                                    <tr key={i}>
                                        <td className="col-1 py-1"><a href={userLink}>{user.username}</a></td>
                                        <td className="col-1">{user.wins}</td>
                                        <td className="col-1">{user.losses}</td>
                                        <td className="col-1">{user.gamesPlayed}</td>
                                        <td className="col-1">{user.winLosePercentage ? user.winLosePercentage.toFixed(3) : user.winLosePercentage}</td>
                                        <td className="col-1">{user.points}</td>
                                        <td className="col-1">{user.rating ? user.rating.toFixed(4) : user.rating}</td>
                                        <td className="col-1">{user.team ? user.team : "N/A"}</td>
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