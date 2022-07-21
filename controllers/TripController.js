import TripModel from '../models/Trip.js';

export const getAll = async (req, res) => {
  try {
    const { titleValue, levelValue, durationId} = req.query;
    const title = new RegExp(titleValue, 'i');
    const level = new RegExp(levelValue, 'i');
    let duration;

    switch (durationId) {
      case '1':
        duration = { $gt :  0, $lt : 5};
        break;
      case '2':
        duration = { $gt :  4, $lt : 10};
        break;
      case '3':
        duration = { $gt :  9, $lt : 100};
        break;
      default:
        duration = { $gt :  0, $lt : 100};
    }

    const trips = await TripModel.find({
      title,
      level,
      duration,
    })

    const tripsData = trips.map(trip => {
      const { updatedAt, __v, ...tripData } = trip._doc;
      return tripData;
    });

    res.json(tripsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати повідомлення',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const trip = await TripModel.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: 'Повідомлення не знайдено',
      });
    }

    const { updatedAt, __v, ...tripData } = trip._doc;

    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить сообщения',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TripModel({
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      duration: req.body.duration,
      price: req.body.price,
      image: req.body.image,
    });

    const trip = await doc.save();

    res.json(trip);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося створити повідомлення',
    });
  }
};
