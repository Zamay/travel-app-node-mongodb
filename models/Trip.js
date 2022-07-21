import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 15,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

TripSchema.index({ level: 'text' });

export default mongoose.model('Trip', TripSchema);
