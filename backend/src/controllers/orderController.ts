import { Request, Response } from 'express';
import { Order } from '../models/orderModel';
import { orderSchema } from '../utils/validation';
import { sendOrderConfirmation, sendAdminNotification } from '../utils/email';
import { uploadToCloudinary } from '../utils/cloudinary';

export const createOrder = async (req: Request, res: Response) => {
  // Validate request body
  const { success, error, data } = orderSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ errors: error.message });
  }

  // Check if file exists
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: 'Photo is required' });
  }

  try {
    const photo = req.files.photo as any;
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(photo.mimetype)) {
      return res.status(400).json({ message: 'Only JPEG, PNG, or GIF images are allowed' });
    }
    if (photo.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size must be less than 5MB' });
    }

    // Log file details for debugging
    console.log('Uploading file:', {
      name: photo.name,
      size: photo.size,
      mimetype: photo.mimetype,
      tempFilePath: photo.tempFilePath,
    });

    // Upload to Cloudinary
    const photoUrl = await uploadToCloudinary(photo);

    // Create order with Cloudinary URL
    const order = await Order.create({
      ...data,
      photo: photoUrl,
      user: (req as any).user._id,
    });

    // Send email notifications
    // await sendOrderConfirmation(data.email, order._id.toString());
    // await sendAdminNotification(order);

    res.status(201).json(order);
  } catch (error: any) {
    console.error('Order creation error:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: `Failed to create order: ${error.message}` });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: (req as any).user._id });
  res.json(orders);
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (status) {
    order.status = status;
    await order.save();
  }

  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({ message: 'Order deleted' });
};