import covid19Model from "../models/covid19DetailsModel.js";
import patientModel from "../models/patientModel.js";
export {
    getCovid19Details,
    getCovid19DetailsById,
    addCovid19Details,
    updateCovid19Details,
    deleteCovid19Details
}

async function getCovid19Details(req, res) {
  console.log("I am in function getCovid19Details");
  try{
      let data = await covid19Model.find({})
      console.log(data)
      res.status(200).send(data);
  }
  catch(error) {
      console.log(error);
      res.status(500).json("Error occurred during getCovid19Details operation");
    };
}

async function getCovid19DetailsById(req, res) {
    console.log("I am in function getCovid19DetailsById");
    try{
        console.log(req.params.patientId)
        let data = await covid19Model.findOne({patientId:req.params.id})
        console.log(data)
        res.status(200).send(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).json("Error occurred during getCovid19DetailsById operation");
      };
}


async function addCovid19Details(req, res) {
    console.log("I am in function addCovid19Details");
    try {
      const existingCovid19 = await covid19Model.findOne({ patientId: req.body.patientId });
      if (existingCovid19) return res.status(409).send('This patient has already covid 19 details!');

      const hasPatient = await patientModel.findOne({ id: req.body.patientId });
      if(!hasPatient) return res.status(400).send('You dont have such a patient. Make sure you are trying to enter the correct patient, if so add a new patient first')

      const { positiveTestDate, recoveryDate } = req.body;
      const positiveTestDateTime = new Date(positiveTestDate);
      const recoveryDateTime = new Date(recoveryDate);
  
      if(positiveTestDateTime > recoveryDateTime)
        return res.status(400).send('positiveTestDateTime can not be after recoveryDateTime');
      
      const newCovid19Details = new covid19Model(req.body);
      await newCovid19Details.save();
      console.log(newCovid19Details);
      res.status(200).send('add newCovid19Details success'); 
    } catch (error) {
      console.error('Error adding newCovid19Details:', error);
      res.status(500).send(error.message);
    }
  }

  async function updateCovid19Details(req, res) {
    console.log("I am in function updateCovid19Details");
    try {
      const updatedCovid19Details = await covid19Model.updateOne({ patientId: req.body.patientId }, req.body);
      console.log(updatedCovid19Details)
      if (updatedCovid19Details) {
        res.status(200).send('updateCovid19Details succedd');
      } else {
        res.status(404).send('covid19Details not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while updating students.');
    }
  }

async function deleteCovid19Details(req,res)
 {
   try{
       await covid19Model.deleteOne({patientId:req.params.id})
       res.status(200).send("remove patient successed")
   }
   catch(error)
   {
    res.status(500).send(error.message);
   }
 }