import { connectToDatabase } from './db.js';

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('orders');

    if (req.method === 'GET') {
        const orders = await collection.find({}).sort({ id: -1 }).toArray();
        return res.status(200).json(orders);
    }

    if (req.method === 'POST') {
        const order = req.body;
        await collection.insertOne(order);
        return res.status(201).json(order);
    }

    if (req.method === 'PUT') {
        const { id, status } = req.body;
        await collection.updateOne({ id }, { $set: { status } });
        return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;
        await collection.deleteOne({ id });
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
