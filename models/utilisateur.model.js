const mongoose = require("mongoose");

const SchemaUtilisateur = mongoose.Schema(
    {
        Identifiant: {
            type : String,
            required: true,
        },
        MotDePasse: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
    {
        collection: "utilisateurs"
    }
);

module.exports = mongoose.model("Utilisateur", SchemaUtilisateur);