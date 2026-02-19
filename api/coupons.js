import { connectToDatabase } from './db.js';

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('coupons');

    if (req.method === 'GET') {
        const coupons = await collection.find({}).toArray();
        return res.status(200).json(coupons);
    }

    if (req.method === 'POST') {
        const coupon = req.body;
        await collection.insertOne(coupon);
        return res.status(201).json(coupon);
    }

    if (req.method === 'DELETE') {
        const { code } = req.body;
        await collection.deleteOne({ code });
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
