import mongoose from "mongoose"; 

const PerfumesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: false},
    price: {type: mongoose.Decimal128, required: false},
    releaseDate: {type: Date, required: false},
    gender: {
        type: String,
        enum: ["male", "female", "unisex"], 
        required: true
    },
    imageUrl: {type: String, required: false},
    olfactoryFam: [{type: String}],
    olfactoryNotes: {
        top: [{Array: String}], 
        heart: [{Array: String}], 
        base: [{Array: String}],
    },
    stats : { 
        nbVotes: {type: Nomber, default: 0}, 
        avgRating: {type: Nomber, default: 0},
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},

    },
    { timestamps: true } // ajoute auto createdAt + updatedAt
);

export const PerfumesModel = mongoose.model("perfumes", PerfumesSchema);