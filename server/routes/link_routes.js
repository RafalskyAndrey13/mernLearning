const {Router} = require('express');
const Link = require('../models/Link');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const shortId = require('shortid');

const router = Router();

router.post('/generate', auth, async (request, response) => {
    try {
        const BASE_URL = config.get('baseURL');
        const {from} = request.body;

        const code = shortId.generate();

        const existing = await Link.findOne({from, owner: request.user.userId});

        if (existing){
            return response.json({link: existing})
        }

        const to = BASE_URL + '/t/' + code;

        const link = new Link({
            code, to, from, owner: request.user.userId,
        })

        await link.save();

        response.status(201).json({link})

    } catch(e) {
        response.status(500).json({message: 'Server Error'});
    }
});

router.get('/',
    auth,
    async (request, response) => {
    try {
        const links = await Link.find({owner: request.user.userId})
        response.json(links);
    } catch(e) {
        response.status(500).json({message: 'Server Error'});
    }
});

router.get('/:id', auth, async (request, response) => {
    try {
        const link = await Link.findById(request.params.id);
        response.json(link);
    } catch(e) {
        response.status(500).json({message: 'Server Error'});
    }
})

module.exports = router;