import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        return res.json({ login: true });
    }
    return res.json({ login: false });
});

router.post('/register', (req, res) => {
    console.log('request register', req)
    return res.json({ register: 'success' });
});

export default router;