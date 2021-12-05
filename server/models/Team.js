const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        wins: {
            type: Number,
        },
        losses: {
            type: Number,
        },
        gamesPlayed: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    },
);

const Team = model("Team", teamSchema);

module.exports = Team;