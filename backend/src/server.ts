import app from './app';
import { connectDB } from './config/db';
import { mkdirSync } from 'fs';

const PORT = process.env.PORT || 8080;

// Create tmp directory for file uploads
mkdirSync('/tmp', { recursive: true });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});