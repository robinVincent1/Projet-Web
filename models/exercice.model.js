const mongoose = require("mongoose");

const SchemaExercice = mongoose.Schema(
    {
        idSeance : {
            type: String,
            required: true,
        },
        nom: {
            type : String,
            required: true,
        },
        series: {
            type: [[String, String]],
            required: true,
        },
        performances: {
            type: [[String, String]],
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

module.exports = mongoose.model("Exercice", SchemaExercice);