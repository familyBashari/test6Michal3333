import patientModel from "../models/patientModel.js";
import covid19Model from "../models/covid19DetailsModel.js";
import path, { basename } from "path";

export {
    getPatients,
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient,
    getImageOfPatient
}

async function getPatients(req, res) {
    console.log("found patients");
    try{
        let data = await patientModel.find({});
        res.send(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).json("Error occurred during getPatients operation");
      };
}

async function getPatientById(req, res) {
  console.log("finding patient by id...");
  try {
      let data = await patientModel.findOne({ id: req.params.id });
      if (data) {
          res.status(200).send(data);
      } else {
          res.status(404).send("There is no such patient");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("Error occurred during getPatientById operation");
  }
}

async function getImageOfPatient(req, res){
  try{
  console.log("I am in function getImageOfPatient");
  console.log(req.params.id);
  const dom=await patientModel.find({id:req.params.id});
  let imagePath=dom[0].image;
  const basedir=path.resolve();
  const filePath = path.join(basedir,imagePath);
  res.status(200).sendFile(filePath);
  }
  catch{
    console.error("error");
  }
}

async function addPatient(req, res) {
  try {
    const existingPatient = await patientModel.findOne({ id: req.body.id });
    console.log(existingPatient)
    if (existingPatient) return res.status(409).send('Patient already exists');
    const newPatient = new patientModel({
      ...req.body,
      image: req.file?.path // Optional image path
    });
    console.log(req.file?.path)
    await newPatient.save();
    return res.status(200).send('Patient added successfully');
  } catch (error) {
    console.error('Error adding patient:', error);
    return res.status(500).send(error.message);

  }
}
async function updatePatient(req, res) {
  try {
    let up={};
    const { id, address, ...otherProperties } = req.body;

    const updateQuery = {};

    // בדיקה האם קיימת תכונה "address" בבקשה
    if (address) {
      const addressUpdateQuery = {};
      ['city', 'street', 'buildingNumber'].forEach(key => {
        if (address[key]) addressUpdateQuery[`address.${key}`] = address[key];
      });

      // עדכון תכונת "address"
      await patientModel.updateOne({ id }, { $set: addressUpdateQuery });
    }

    // עדכון שאר התכונות
    if (Object.keys(otherProperties).length > 0) {
      await patientModel.updateOne({ id }, { $set: otherProperties });
    }
    up = await patientModel.findOne({ id: req.body.id });
    res.status(200).send(up);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating patients.');
  }
}


async function deletePatient(req,res)
 {
   try{
       let patientForDelete = await patientModel.findOne({id:req.params.id})
       let covid19 = await covid19Model.findOne({patientId:req.params.id})
       if(patientForDelete)
       {
          if(covid19)
            await covid19Model.deleteOne({patientId:req.params.id})
          await patientModel.deleteOne({id:req.params.id})
       }
       res.status(200).send(patientForDelete)
   }
   catch(error)
   {
    res.status(500).send('Internal Server Error');
   }
 }

