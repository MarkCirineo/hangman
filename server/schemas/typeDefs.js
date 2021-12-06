const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        wins: Int!
        losses: Int!
        gamesPlayed: Int!
        rating: Int!
        team: Team
        createdAt: String
        updatedAt: String
    }

    type Team {
        _id: ID!
        name: String!
        leader: User!
        members: [User]
        wins: Int!
        losses: Int!
        gamesPlayed: Int!
        rating: Int!
        createdBy: User!
        createdAt: String
        updatedAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(_id: ID!): User
        team(_id: ID!): Team
        users: [User]
        teams: [Team]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteUser: User
        createTeam(name: String!): Team
        joinTeam(_id: ID!): Team
        leaveTeam(_id: ID!): Team
        deleteTeam(_id: ID!): Team
        win: User
        lose: User
    }
`;

module.exports = typeDefs;