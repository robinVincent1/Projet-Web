const mongoose = require("mongoose");
const exerciceSchema = require("./exercice.model");

const SchemaSeance = new mongoose.Schema(
    {
        idProgramme: {
            type: String,
            required: true,
        },
        nom: {
            type : String,
            required: true,
        },
        muscle: {
            type: [String],
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

module.exports = mongoose.model("Seance", SchemaSeance)