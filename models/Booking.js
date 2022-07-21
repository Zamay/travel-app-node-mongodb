import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('Booking', BookingSchema);
