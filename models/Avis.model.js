const mongoose = require("mongoose");
const UtilisateurSchema = require("./utilisateur.model");

const SchemaAvis = mongoose.Schema(
    {
       utilisateur : {
        type: String,
        required: true,
        },
        objet: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
    {
        collection: "Avis"
    }
);

module.exports = mongoose.model("Avis", SchemaAvis);