import express from 'express';
import verify from './verifyToken'

const router = express.Router();

router.get('/', verify, (req, res) => {
    res.json({ message: "List of all todos created by this user" });
})

export default router;
