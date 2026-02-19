import { connectToDatabase } from './db.js';

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    if (req.method === 'POST') {
        const { action, ...data } = req.body;

        if (action === 'signup') {
            const existing = await collection.findOne({ email: data.email });
            if (existing) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            const user = { ...data, id: Date.now() };
            await collection.insertOne(user);
            return res.status(201).json(user);
        }

        if (action === 'login') {
            const user = await collection.findOne({ email: data.email, password: data.password });
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
