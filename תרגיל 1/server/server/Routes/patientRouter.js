import express from 'express';
import * as patientController from '../Controllers/patientController.js'
import upload from "../middelware/upload.js";
import verifyToken from '../middelware/verifyToken.js';

const router = express.Router();

  
router.get('/',verifyToken, patientController.getPatients)
router.get('/:id', patientController.getPatientById) 

router.get('/image/:id', patientController.getImageOfPatient)

router.post('/', upload.single('image') ,patientController.addPatient)
router.put('/', patientController.updatePatient)
router.delete('/:id', patientController.deletePatient)

export default router;