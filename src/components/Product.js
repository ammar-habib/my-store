import {Card, Row, Col, Badge} from 'react-bootstrap';
const Product = ({product}) => {
    return (
        <Card className="productCard">
            <Card.Body>
                <Card.Title as="h2">
                    <Row className="justify-content-between align-items-center">
                        <Col xs="8">{product.title}</Col>
                        <Col xs="auto" className="text-right">
                            <Badge>${product.price}</Badge>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Subtitle as="h3" className="mb-2">{product.category}</Card.Subtitle>
                <hr className="productCard__divider"/>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <div className="productCard__img">
                    <img className="img-fluid" src={product.image}  alt="product"/>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;