'use strict';

import express from 'express';

const router = express.Router();

const postList = [
    {
        key: 1,
        // image: require('../../assets/images/b3.png'),
        title: 'B3 Coin',
    },
    {
        key: 2,
        // image: require('../../assets/images/paccoin.png'),
        title: 'Pac coin',
    },
    {
        key: 3,
        // image: require('../../assets/images/shnd.png'),
        title: 'Strong Hands Coin',
    },
    {
        key: 4,
        // image: require('../../assets/images/strat.png'),
        title: 'Startis Coin',
    },
    {
        key: 5,
        // image: require('../../assets/images/xp.png'),
        title: 'XP Coin',
    },
    {
        key: 6,
        // image: require('../../assets/images/b3.png'),
        title: 'B3 Coin',
    },
    {
        key: 7,
        // image: require('../../assets/images/paccoin.png'),
        title: 'Pac coin',
    },
    {
        key: 8,
        // image: require('../../assets/images/shnd.png'),
        title: 'Strong Hands Coin',
    },
    {
        key: 9,
        // image: require('../../assets/images/strat.png'),
        title: 'Startis Coin',
    },
    {
        key: 10,
        // image: require('../../assets/images/xp.png'),
        title: 'XP Coin',
    },
    {
        key: 11,
        // image: require('../../assets/images/b3.png'),
        title: 'B3 Coin',
    },
    {
        key: 12,
        // image: require('../../assets/images/paccoin.png'),
        title: 'Pac coin',
    },
    {
        key: 13,
        // image: require('../../assets/images/shnd.png'),
        title: 'Strong Hands Coin',
    },
    {
        key: 14,
        // image: require('../../assets/images/strat.png'),
        title: 'Startis Coin',
    },
    {
        key: 15,
        // image: require('../../assets/images/xp.png'),
        title: 'XP Coin',
    }
];

router.get('/', (req, res) => {
    const sampleData = JSON.stringify(postList);
    res.send(sampleData);
});

router.get('/:id', (req, res) => {
    res.send('You are reading post ' + req.params.id);
})

export default router;