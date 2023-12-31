import mongoose from "mongoose";

const equipmentsSchema = new mongoose.Schema(
  {
    equipment_name: {
      type: String,
      required: [true, 'Please equipment name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
    },
  },
);

const Equipments = mongoose.model('equipments', equipmentsSchema);

export default Equipments;