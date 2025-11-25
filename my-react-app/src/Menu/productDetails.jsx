import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProductById } from '../data/foodItems';
import ReviewCard from '../Components/reviewCard';

export default function ProductDetails() {
    const { id } = useParams();
    const item = getProductById(id);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('Small');

    if (!item) {
        return <p className="text-center py-5">Product not found.</p>;
    }

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () =>
        quantity > 1 && setQuantity(quantity - 1);

    return (
        <>
            <section className="py-5">
                <div className="container" style={{ marginTop: '70px' }}>
                    <div className="row align-items-center">
                        {/* Image */}
                        <div className="col-lg-6" style={{ width: '450px', marginRight: '70px', marginLeft: '50px' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-3">{item.name}</h2>

                            <div className="d-flex align-items-center mb-3">
                                <span className="text-warning me-2">⭐</span>
                                <span className="fw-bold">{item.rating}</span>
                            </div>

                            <p className="text-muted mb-4">{item.description}</p>

                            {/* Quantity */}
                            <div className="d-flex align-items-center mb-4">
                                <button
                                    className="btn btn-dark rounded-circle"
                                    style={{ width: '40px', height: '40px' }}
                                    onClick={handleDecrease}
                                >
                                    -
                                </button>
                                <span className="mx-4 fs-5 fw-bold">{quantity}</span>
                                <button
                                    className="btn btn-dark rounded-circle"
                                    style={{ width: '40px', height: '40px' }}
                                    onClick={handleIncrease}
                                >
                                    +
                                </button>
                            </div>

                            {/* Sizes */}
                            <div className="d-flex gap-3 mb-4">
                                {['Small', 'Medium', 'Large'].map(size => (
                                    <button
                                        key={size}
                                        className={`btn ${selectedSize === size ? 'btn-dark' : 'btn-outline-secondary'
                                            } px-4`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Price and Add to cart */}
                            <div className="d-flex align-items-center gap-4">
                                <h3 className="fw-bold mb-0">${item.price}</h3>
                                <button
                                    className="btn btn-lg px-5 text-white"
                                    style={{
                                        backgroundColor: '#7FA9A3',
                                        borderRadius: '30px',
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-5">
                <div className="container">
                    <h3 className="fw-bold mb-4">Customer Reviews</h3>

                    <div
                        className="d-flex gap-4 pb-3"
                        style={{
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            scrollBehavior: 'smooth', // Adds smooth scrolling
                        }}
                    >
                        {item.reviews.map((review) => (
                            <ReviewCard review={review}></ReviewCard>
                        ))}
                    </div>
                </div>
                <button
                    className="btn btn-lg px-5 text-white"
                    style={{
                        backgroundColor: '#7FA9A3',
                        borderRadius: '30px',
                        marginLeft:'75%',
                        marginTop:'30px'
                    }}
                >
                    Add Review
                </button>
            </section>
        </>
    );
}