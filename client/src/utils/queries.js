import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            wins
            losses
            gamesPlayed
            rating
            team {
                _id
                name
            }
            createdAt
            updatedAt
        }
    } 
`;

export const GET_USER = gql`
    query user($_id: ID!) {
        user(_id: $_id) {
            _id
            username
            wins
            losses
            gamesPlayed
            rating
            team {
                _id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
            wins
            losses
            gamesPlayed
            rating
            team {
                _id 
                name
            }
            createdAt
            updatedAt
        }
    }
`;