import express from 'express';
import { debtController } from '../controllers/debt.controller';

const router = express.Router();

router.post('/', debtController.create);
router.get('/', debtController.list);
router.patch('/:id/status', debtController.updateStatus);

export default router;
