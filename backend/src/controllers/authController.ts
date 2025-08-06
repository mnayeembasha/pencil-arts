import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { registerSchema, loginSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { success, error, data } = registerSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ errors: error.message });
  }

  try {
    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(201).json({ token, user: { _id: user._id, name, email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { success, error, data } = loginSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ errors: error.message });
  }

  try {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User Does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token, user: { _id: user._id, name: user.name, email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to login' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
};
