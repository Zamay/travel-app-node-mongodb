import BookingModel from '../models/Booking.js';

export const getAll = async (req, res) => {
  try {
    const bookings = await BookingModel.find().sort({date: 1});

    const bookingsData = bookings.map(booking => {
      const {  __v, ...bookingData } = booking._doc;
      return bookingData;
    });

    res.json(bookingsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати повідомлення',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new BookingModel({
      totalPrice: req.body.totalPrice,
      guests: req.body.guests,
      date: req.body.date,
      title: req.body.title,
      userId: req.userId,
    });

    const booking = await doc.save();

    const { __v, ...bookingData } = booking._doc;

    res.json(bookingData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося створити повідомлення',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const bookingId = req.params.id;

    BookingModel.findOneAndDelete(
      {
        _id: bookingId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Неможливо видалити повідомлення',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Повідомлення не знайдено',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати повідомлення',
    });
  }
};
