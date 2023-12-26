import app from './app';
import env from './util/validateEnv';
import mongoose from 'mongoose';

const port = env.PORT;

const MONGODB_URI = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.unz10ho.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection successful');
    app.listen(port, () => {
      console.log('Server running on port:' + port);
    });
  })
  .catch(console.error);
