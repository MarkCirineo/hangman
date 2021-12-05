const { AuthenticationError } = require("apollo-server-express");
const { User, Team } = require("../models");

const resolvers = {
    Query: {
        me: async (parent, _, context) => {
            if (context.user) {
                const user = User.findOne({ _id: context.user._id })
                return user;
            }
            throw new AuthenticationError("You must be logged in!");
        },
        user: async (parent, { _id }) => {
            const user = User.findOne({ _id });
            return user;
        },
        team: async (parent, { _id }) => {
            const team = Team.findOne({ _id }).populate({ path: "members" });
            return team;
        },
        users: async () => {
            const users = User.find();
            return users;
        },
        teams: async () => {
            const teams = Team.find();
            return teams;
        },
    },
}