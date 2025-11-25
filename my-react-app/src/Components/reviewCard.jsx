export default function ReviewCard({review}){
    return(
         <div
          key={review.id}
          className="card border-0 shadow-sm p-3"
          style={{
            minWidth: '250px', // keeps each card fixed width
            display: 'inline-block',
            flex: '0 0 auto', // prevent wrapping
            borderRadius: '10px',
          }}
        >
          <h6 className="fw-bold mb-1">{review.name}</h6>
          <small className="text-muted">{review.role}</small>
          <div className="mb-2 text-warning">
            {'★'.repeat(review.rating)}
          </div>
          <p className="text-muted small" >{review.text}</p>
        </div>
    )
}