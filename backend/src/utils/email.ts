import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter with explicit TLS settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // Use TLS with STARTTLS for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3', // Ensure compatibility with Gmail
    rejectUnauthorized: true,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer verification failed:', {
      message: error.message,
      stack: error.stack,
    });
  } else {
    console.log('Nodemailer transporter ready');
  }
});


export const sendOrderConfirmation = async (to: string, orderId: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pencil Arts" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Order Received - Pencil Arts',
      text: `Thank you for your order (ID: ${orderId}). We have received your request and will process it soon.`,
    });
    console.log(`Order confirmation email sent to ${to}:`, info.messageId);
  } catch (error: any) {
    console.error('Error sending order confirmation email:', {
      message: error.message,
      stack: error.stack,
    });
    throw error; // Re-throw to handle in caller
  }
};

export const sendAdminNotification = async (order: any) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pencil Arts" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order Received - Pencil Arts',
      text: `New order received:\nName: ${order.name}\nEmail: ${order.email}\nMessage: ${order.message}\nStatus: ${order.status}`,
    });
    console.log(`Admin notification email sent to ${process.env.ADMIN_EMAIL}:`, info.messageId);
  } catch (error: any) {
    console.error('Error sending admin notification email:', {
      message: error.message,
      stack: error.stack,
    });
    throw error; // Re-throw to handle in caller
  }
};
