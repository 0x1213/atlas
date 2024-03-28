import { createClient } from 'redis';

export const addToQueue = async (id) => {
  const publisher = createClient();
  publisher.connect();
  await publisher.lPush('atlas-projects', id);
};

export const generateProjectID = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};
