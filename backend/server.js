import express from 'express';
import cors from 'cors'
import 'dotenv/config.js';
import products from './data/products.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())

app.get('/', (req, res) => {
	res.send('API is running bos!');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const { id } = req.params;
	const product = products.find(product => product._id === id);
	res.json(product);
});

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
