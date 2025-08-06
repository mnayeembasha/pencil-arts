import mongoose, { Schema } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  email: string;
  message: string;
  photo: string; // Store file path or URL
  status: 'pending' | 'completed' | 'delivered';
  user: mongoose.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  photo: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'delivered'], default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
