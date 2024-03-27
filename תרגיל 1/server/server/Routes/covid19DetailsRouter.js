import express from 'express';
import * as covid19DetailsController from '../Controllers/covid19DetailsController.js'
const router = express.Router();

router.get('/', covid19DetailsController.getCovid19Details) 
router.get('/:id', covid19DetailsController.getCovid19DetailsById) 
router.post('/', covid19DetailsController.addCovid19Details)
router.put('/',covid19DetailsController.updateCovid19Details)
router.delete('/:id',covid19DetailsController.deleteCovid19Details)

export default router;