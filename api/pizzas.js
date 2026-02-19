import { connectToDatabase } from './db.js';

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('pizzas');

    if (req.method === 'GET') {
        const pizzas = await collection.find({}).toArray();
        return res.status(200).json(pizzas);
    }

    if (req.method === 'POST') {
        const pizza = req.body;
        await collection.insertOne(pizza);
        return res.status(201).json(pizza);
    }

    if (req.method === 'PUT') {
        const { id, price } = req.body;
        await collection.updateOne({ id }, { $set: { price } });
        return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;
        await collection.deleteOne({ id });
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
