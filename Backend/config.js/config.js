import dotenv from 'dotenv';

dotenv.config();

const PORT=process.env.PORT;
const dbURL=process.env.MONGODB_URI;

export {PORT,dbURL};