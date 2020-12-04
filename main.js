require('dotenv').config();
const express = require('express');
const axios = require('axios');
const server = express();
const port = process.env.PORT;

server.get('/', async (req, res) => {
	if(req.query && req.query.src) {
		try {
			const srcResponse = await axios.get(req.query.src);
			res.send(srcResponse.data);
		} catch(e) {
			console.error(e);
			res.send(502);
			res.send({error: "Bad response from upstream server."});
		}
	} else {
		res.status(400);
		res.send({error: "Missing required query parameter 'src'"});
	}
});

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
