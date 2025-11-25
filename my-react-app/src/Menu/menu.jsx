import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuFoodCard from '../Components/menuFoodCard';
import { getAllProducts } from '../data/foodItems';
import foodItems from '../data/foodItems'; 

export function Menu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: '🍽️', image: '/all-icon.png' },
    { name: 'Burger', icon: '🍔', image: '/burger-icon.png' },
    { name: 'Pizza', icon: '🍕', image: '/pizza-icon.png' },
    { name: 'Meat', icon: '🥩', image: '/meat-icon.png' },
    { name: 'Chicken', icon: '🍗', image: '/chicken-icon.png' },
    { name: 'Dessert', icon: '🍰', image: '/dessert-icon.png' },
    { name: 'Sushi', icon: '🍣', image: '/sushi-icon.png' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine which items to show
  const displayedItems =
    selectedCategory === 'All'
      ? getAllProducts()
      : foodItems[selectedCategory] || [];

  return (
    <section className="py-5">
      <div className="container" style={{ paddingTop: '100px' }}>
        {/* Search Bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill ps-5"
                placeholder="Search food categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                  color: '#6c757d',
                }}
              ></i>
            </div>
          </div>
        </div>

        {/* Categories Icons */}
        <div className="overflow-auto mb-5" style={{ whiteSpace: 'nowrap' }}>
          <div className="d-inline-flex gap-4 pb-3">
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className="text-center"
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  cursor: 'pointer',
                  minWidth: '80px',
                  opacity: selectedCategory === category.name ? 1 : 0.7,
                  transform:
                    selectedCategory === category.name
                      ? 'scale(1.1)'
                      : 'scale(1)',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{
                    width: '60px',
                    height: '60px',
                    border:
                      selectedCategory === category.name
                        ? '3px solid #81A4A6'
                        : 'none',
                    backgroundColor:
                      selectedCategory === category.name
                        ? '#81A4A6'
                        : '#f8f9fa',
                  }}
                >
                  <span style={{ fontSize: '30px' }}>{category.icon}</span>
                </div>
                <small
                  className={`${
                    selectedCategory === category.name ? 'fw-bold' : ''
                  }`}
                >
                  {category.name}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Display Food Items */}
        <div>
          {displayedItems.length > 0 ? (
            <>
              <h4 className="mb-4">
                {selectedCategory === 'All'
                  ? 'All Menu Items'
                  : `Available ${selectedCategory} Items`}
              </h4>
              <div className="row g-4">
                {displayedItems.map((item) => (
                  <MenuFoodCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No items found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}