import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
// import products from '../products.js';
import Product from '../components/Product.jsx';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	// const API = import.meta.env.VITE_BACKEND_API

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');

			setProducts(data);
		};
		fetchProducts();
	}, []);

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => {
					return (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product}/>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default HomeScreen;
