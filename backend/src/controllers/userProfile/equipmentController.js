import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import Equipments from '../../models/equipments.model.js';


const getAllEquipments = async (request, response) => {
  const equipments = await Equipments.find().exec();
  response.json(equipments);
};


const createEquipment = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the user profile data from the body of the request
    const { equipment_name, description, image_url } = request.body.equipments;

    const foundEquipment = await Equipments.findOne({ equipment_name }).exec();
    if (foundEquipment) return response.sendStatus(409); // Conflict

    const equipment = new Equipments({
      equipment_name: equipment_name,
      description: description,
      image_url: image_url
    });

    // Save the user profile to the database
    await equipment.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ equipments: equipment.toObject({ getters: true }) });

  } catch (error) {

    //Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ error: error.message })
  } finally {

    // End the mongoose session
    session.endSession();

  }
};

export default {
  getAllEquipments,
  createEquipment
};