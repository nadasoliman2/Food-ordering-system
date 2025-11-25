export default function FoodCard({image , name, description,price, rating}) {
  return (
    <div className="card shadow-sm rounded-4 p-3 position-relative border-0" style={{ width: '16rem', backgroundColor: '#ECECEC' }}>

      {/* Image */}
      <div className="d-flex justify-content-start" style={{ marginTop: '-4rem' }}>
        <img
          src={image}
          alt="Honey Pancake"
          className="img-fluid"
          style={{ width: '10rem', height: '10rem', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        />
      </div>

      {/* Rating */}
      <div className="position-absolute top-0 end-0 d-flex align-items-center gap-1 p-2">
        <span className="text-warning fs-5">★</span>
        <span className="text-secondary fw-medium">{rating}</span>
      </div>

      {/* Text Content */}
      <div className="text-start mt-3" >
        <h5 className="fw-semibold text-dark mb-1">{name}</h5>
        <p className="text-muted small mb-3">{description}</p>
      </div>

      {/* Bottom Section */}
      <div className="d-flex justify-content-between align-items-center px-2">
        {/* Cart button */}
        <button className="btn" style={{ backgroundColor: '#6CA89E', borderRadius: '30%', paddingLeft: '0.75rem', paddingRight: '0.75rem' }}>
          <img
            src="/Vector.png"
            alt="cart icon"
            className="img-fluid"
            style={{ width: '1rem', height: '1rem', objectFit: 'contain' }}
          />

        </button>

        {/* Price */}
        <span className="fw-semibold fs-5 text-dark">{price}$</span>
      </div>
    </div>

  );
}