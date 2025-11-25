import CategoryCard from "../Components/categoryCard";

const categories = [
  { name: 'Dessert', image: '/desertsCategory.png' },
  { name: 'Pizza', image: '/desertsCategory.png' },
  { name: 'Salad', image: '/desertsCategory.png' },
  { name: 'Chicken', image: '/desertsCategory.png' },
  { name: 'Burger', image: '/desertsCategory.png' },
  { name: 'Drinks', image: '/desertsCategory.png' },

  // Add more categories as needed
];  

export default function CategorySection(){
    return (
        <section className="food-category-carousel py-5">
                <div className="container">
                  <div className="text-center mb-5">
                    <h2 className="fw-bold">Explore Categories</h2>
                    <p className="text-muted">Start Discovering A Lot Of Food Categories</p>
                  </div>
        
                  <div className="position-relative d-flex align-items-center">
        
                    <div className="d-flex flex-nowrap overflow-auto py-3"> {/* overflow-auto for horizontal scrolling */}
                      {categories.map((category, index) => (
                        <CategoryCard key={index} name={category.name} image={category.image} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
    )
}