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
        teams: [Teams]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteUser: User
        createTeam(name: String!): Team
        joinTeam(name: String!): Team
        leaveTeam(name: String!): Team
        deleteTeam(name: String!): Team
        win: User
        lose: User
    }
`;

module.exports = typeDefs;