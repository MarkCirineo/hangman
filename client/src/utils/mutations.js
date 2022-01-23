import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser {
        deleteUser {
            _id
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation createTeam($name: String!) {
        createTeam(name: $name) {
            _id
            name 
            leader
        }
    }
`;

export const JOIN_TEAM = gql`
    mutation joinTeam($_id: ID!) {
        joinTeam(_id: $_id) {
            _id
            name
        }
    }
`;

export const LEAVE_TEAM = gql`
    mutation leaveTeam($_id: ID!) {
        leaveTeam(_id: $_id) {
            _id
            name
        }
    }
`;

export const DELETE_TEAM = gql`
    mutation deleteTeam($_id: ID!) {
        deleteTeam(_id: $_id) {
            _id
            name
        }
    }
`;

export const WIN = gql`
    mutation win($points: Int!) {
        win(points: $points) {
            _id 
            username 
            wins
            losses
            gamesPlayed
        }
    }
`;

export const LOSE = gql`
    mutation lose {
        lose {
            _id 
            username 
            wins
            losses
            gamesPlayed
        }
    }
`;