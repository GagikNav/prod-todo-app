const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

const SECRET_KEY = 'your-secret-key';

server.use(bodyParser.json());
server.use(middlewares);

function createTokens(payload) {
	const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });
	const refreshToken = jwt.sign(payload, SECRET_KEY + 'refresh', { expiresIn: '7d' });
	return { accessToken, refreshToken };
}

function verifyToken(token) {
	return jwt.verify(token, SECRET_KEY);
}

server.post('/auth/login', (req, res) => {
	const { username, password } = req.body;
	if (username === 'admin' && password === 'password') {
		const { accessToken, refreshToken } = createTokens({ username, role: 'admin' });
		res.json({ accessToken, refreshToken });
	} else {
		res.status(401).json({ error: 'Invalid credentials' });
	}
});

server.post('/auth/refresh', (req, res) => {
	const refreshToken = req.body.token;

	if (refreshToken === undefined) {
		return res.status(401).json({ error: 'Refresh token is missing' });
	}

	try {
		const decoded = jwt.verify(refreshToken, SECRET_KEY + 'refresh');
		const { accessToken, refreshToken: newRefreshToken } = createTokens({
			username: decoded.username,
			role: decoded.role,
		});
		res.json({ accessToken, refreshToken: newRefreshToken });
	} catch (error) {
		res.status(403).json({ error: 'Refresh token is invalid' });
	}
});

server.use((req, res, next) => {
	if (
		req.headers.authorization === undefined ||
		req.headers.authorization.split(' ')[0] !== 'Bearer'
	) {
		res.status(401).json({ error: 'Access token is missing or invalid' });
		return;
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Access token is missing or invalid' });
	}
});

server.use("/.netlify/functions/api",router);

server.listen(4545, () => {
	console.log('JSON Server is running on port 4545');
});