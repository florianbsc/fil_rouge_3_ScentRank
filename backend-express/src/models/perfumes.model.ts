// import mongoose, { Schema, Document } from "mongoose";

// interface IPerfume extends Document {
//   name: string;
//   brand: string;
//   notes: string[];
//   price?: mongoose.Types.Decimal128;
// }

// const PerfumeSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   notes: [{ type: String }],
//   price: { type: mongoose.Schema.Types.Decimal128, required: false },
// });

// export const PerfumesModel = mongoose.model<IPerfume>("Perfume", PerfumeSchema);


import mongoose, { Schema, Document } from "mongoose";

export interface IPerfume extends Document {
  name: string;
  brand: string;
  price?: number;
  releaseDate?: Date;
}

const PerfumeSchema: Schema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number },
  releaseDate: { type: Date }
});

export default mongoose.model<IPerfume>("Perfume", PerfumeSchema);