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
`