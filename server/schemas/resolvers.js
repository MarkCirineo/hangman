const { AuthenticationError } = require("apollo-server-express");
const { User, Team } = require("../models");
const { signToken } = require("../utils/auth");

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
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        deleteUser: async (parent, _, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError("You must be logged in");
        },
        createTeam: async (parent, { name }, context) => {
            if (context.user) {
                const team = await Team.create(
                    { 
                        name, 
                        leader: context.user.username, 
                        members: [context.user.username], 
                        createdBy: context.user.username 
                    }
                );
                return team;
            }
            throw new AuthenticationError("You must be logged in");
        },
        joinTeam: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedTeam = await Team.findOneAndUpdate(
                    { _id },
                    {
                        $addToSet: {
                            members: context.user._id,
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedTeam;
            }
            throw new AuthenticationError("You must be logged in");
        },
        leaveTeam: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedTeam = await Team.findOneAndUpdate(
                    { _id },
                    {
                        $pull: {
                            members: context.user._id,
                        },
                    },
                    {
                        new: true,
                    },
                );
                return updatedTeam;
            }
            throw new AuthenticationError("You must be logged in");
        },
        deleteTeam: async (parent, { _id }, context) => {
            if (context.user) {
                const deletedTeam = await Team.findOneAndDelete({ _id });
                return deletedTeam;
            }
            throw new AuthenticationError("You must be logged in");
        },
        win: async (parent, _, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { 
                        _id: context.user._id 
                    },
                    {
                        $inc: {
                            wins: 1,
                            gamesPlayed: 1,
                        },
                    },
                );
                const updatedTeam = await Team.findOneAndUpdate(
                    {
                        _id: context.user.team._id
                    },
                    {
                        $inc: {
                            wins: 1,
                            gamesPlayed: 1,
                        },
                    },
                );
                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in");
        },
        lose: async (parent, _, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { 
                        _id: context.user._id 
                    },
                    {
                        $inc: {
                            losses: 1,
                            gamesPlayed: 1,
                        },
                    },
                );
                const updatedTeam = await Team.findOneAndUpdate(
                    {
                        _id: context.user.team._id
                    },
                    {
                        $inc: {
                            losses: 1,
                            gamesPlayed: 1,
                        },
                    },
                );
                return updatedUser;
            }
        }
    }
}