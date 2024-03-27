import express from 'express';
import * as staff from '../Controllers/staffController.js'
const router = express.Router();

router.post('/',staff.addStuff);
router.post('/login', staff.login)

export default router;