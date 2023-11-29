import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
// import products from '../products.js';
import Rating from '../components/Rating.jsx';

const ProductScreen = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [product, setProduct] = useState({});
	const { id: productId } = useParams();

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get(`/api/products/${productId}`);
			setProduct(data);

			const getImageUrl = new URL('../assets/products-and-images' + data.image, import.meta.url).pathname;
			setImageUrl(getImageUrl);
		};
		fetchProducts();
	}, [productId]);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">Go Back</Link>
			<Row>
				<Col md={5}>
					<Image src={imageUrl} alt={product.name} fluid/>
				</Col>

				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating value={product.rating} text={product.numReviews}/>
						</ListGroup.Item>

						<ListGroup.Item>
							Price: ${product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							<strong>Description</strong>: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Stock:</Col>
									<Col>
										<strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button className="btn-block" type="button" disabled={product.countInStock === 0}>
									Add To Cart
								</Button>
							</ListGroup.Item>


						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
