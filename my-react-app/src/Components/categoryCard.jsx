export default function CategoryCard({name , image}){
    return (
    <button 
  className="category-card text-center d-flex flex-column align-items-center justify-content-center mx-2" 
  style={{ backgroundColor: '#EDF3F3', borderRadius: 95, border: 'none' }}
  onClick={() => console.log("Category clicked:", name)}
>
  <div className="category-image-wrapper mb-1" style={{ marginTop: '-1rem' }}>
    <img src={image} alt={name} className="img-fluid rounded-circle" />
  </div>

  <h5 className="category-name mt-2 fw-bold" style={{ paddingBottom: 30 }}>
    {name}
  </h5>
</button>

    )
}