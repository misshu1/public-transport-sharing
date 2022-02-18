import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${encodeURIComponent(
    process.env.MONGO_DB_USER
)}:${encodeURIComponent(process.env.MONGO_DB_PASS)}@${
    process.env.MONGO_DB_URL
}`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = client
    .connect()
    .then(() => {
        console.log('MongoDB Connected');

        return client.db(process.env.MONGO_DB).collection('experiences');
    })
    .catch((error) =>
        console.error('Error on connecting to MongoDB server', error)
    );

export { db };
