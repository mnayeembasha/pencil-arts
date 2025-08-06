import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { createOrder, getUserOrders, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/', protect, createOrder); // Removed upload.single('photo')
router.get('/myorders', protect, getUserOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrder);
router.delete('/:id', protect, admin, deleteOrder);

export default router;