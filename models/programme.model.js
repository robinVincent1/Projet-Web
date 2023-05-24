const mongoose = require("mongoose");

const SchemaProgramme = mongoose.Schema(
    {
        createur:{
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
        },
        nom: {
            type : String,
            required: true,
        },
        affich: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("programme", SchemaProgramme);