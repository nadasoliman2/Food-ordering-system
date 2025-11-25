import { useNavigate } from 'react-router-dom';

export default function MenuFoodCard({item }) {

    const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };
    return (
        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: '15px',
                width: '250px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
            }}
            onClick={handleCardClick} // or navigate to product details
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {/* Image Container */}
            <div className="bg-light p-4" style={{ borderRadius: '15px 15px 0 0', height: '200px' }}>
                <img
                    src={item.image}
                    alt="Product"
                    className="w-100 h-100"
                    style={{ objectFit: 'contain' }}
                />
            </div>

            {/* Card Body */}
            <div className="card-body">
                <h5 className="fw-bold mb-3">{item.name}</h5>
                <div className="mb-2">
                    <span className="fs-4 fw-bold">${item.price}</span>
                </div>
                <p className="text-muted mb-0 small">{item.stock} Left</p>
            </div>
        </div>
    )
}