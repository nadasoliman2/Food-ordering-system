import FoodCard from "../Components/foodCard";

const popularDishes = [
  { name: 'Honey Pancake', image: '/pancakes.png', description: 'Fresh Cake With Sweet Honey', price: '34', rating: '4.5' },
  { name: 'Honey Pancake', image: '/pancakes.png', description: 'Fresh Cake With Sweet Honey', price: '34', rating: '4.5' },
  { name: 'Honey Pancake', image: '/pancakes.png', description: 'Fresh Cake With Sweet Honey', price: '34', rating: '4.5' },

];

export default function PopularDishesSection(){
    return(
          <section className="popular-dishes py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Popular Dishes</h2>
            <p className="text-muted">Start Discovering A Lot Of Food Categories</p>
          </div>


          <div className="d-flex flex-nowrap overflow-auto py-5 gap-4" > {/* overflow-auto for horizontal scrolling */}
            {popularDishes.map((popularDishes, index) => (
              <FoodCard key={index} name={popularDishes.name} image={popularDishes.image} description={popularDishes.description} price={popularDishes.price} rating={popularDishes.rating} />
            ))}
          </div>
        </div>
      </section>

    )
}