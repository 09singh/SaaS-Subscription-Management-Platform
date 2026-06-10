import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Plan", planSchema);