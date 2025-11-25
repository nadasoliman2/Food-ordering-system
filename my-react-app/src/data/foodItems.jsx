const foodItems = {
    Burger: [
        {
            id: 1,
            name: 'Classic Burger',
            image: '/pancakes.png',
            description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
            price: '15.99',
            stock: 8,
            rating: '4.5',
            reviews: [
                {
                    id: 1,
                    name: "John Smith",
                    role: "Food Critic",
                    rating: 5,
                    text: "The Classic Burger never disappoints. Perfectly cooked patty with fresh ingredients."
                },
                {
                    id: 2,
                    name: "Sarah Johnson",
                    role: "Regular Customer",
                    rating: 4,
                    text: "Great taste and value for money. The special sauce is amazing!"
                },
                {
                    id: 3,
                    name: "Mike Davis",
                    role: "Customer",
                    rating: 5,
                    text: "Best burger in town! Juicy and flavorful."
                },
                {
                    id: 4,
                    name: "Emily Chen",
                    role: "Food Blogger",
                    rating: 4,
                    text: "Solid classic burger. Fresh ingredients and generous portions."
                }
            ]
        },
        {
            id: 2,
            name: 'Cheese Burger',
            image: '/pancakes.png',
            description: 'Classic burger topped with melted cheddar cheese',
            price: '14.99',
            stock: 15,
            rating: '4.7',
            reviews: [
                {
                    id: 1,
                    name: "David Wilson",
                    role: "Cheese Lover",
                    rating: 5,
                    text: "Perfect amount of melted cheese! The cheddar quality is excellent."
                },
                {
                    id: 2,
                    name: "Lisa Brown",
                    role: "Customer",
                    rating: 5,
                    text: "My go-to burger. The cheese makes all the difference!"
                },
                {
                    id: 3,
                    name: "Tom Martinez",
                    role: "Regular Customer",
                    rating: 4,
                    text: "Delicious and satisfying. Great for cheese lovers."
                },
                {
                    id: 4,
                    name: "Anna Lee",
                    role: "Food Enthusiast",
                    rating: 5,
                    text: "Simple but perfect. The cheese is always perfectly melted."
                }
            ]
        },
        {
            id: 3,
            name: 'BBQ Burger',
            image: '/pancakes.png',
            description: 'Smoky BBQ sauce, crispy bacon, and onion rings',
            price: '16.99',
            stock: 10,
            rating: '4.8',
            reviews: [
                {
                    id: 1,
                    name: "Robert Taylor",
                    role: "BBQ Expert",
                    rating: 5,
                    text: "The BBQ sauce is phenomenal! Perfect combination with bacon."
                },
                {
                    id: 2,
                    name: "Jennifer White",
                    role: "Food Critic",
                    rating: 5,
                    text: "Love the smoky flavor and crispy onion rings. A must-try!"
                },
                {
                    id: 3,
                    name: "Chris Anderson",
                    role: "Customer",
                    rating: 5,
                    text: "Best BBQ burger I've had. The bacon is perfectly crispy."
                },
                {
                    id: 4,
                    name: "Maria Garcia",
                    role: "Regular Customer",
                    rating: 4,
                    text: "Fantastic flavors! A bit messy but totally worth it."
                }
            ]
        },
    ],
    Pizza: [
        {
            id: 4,
            name: 'Margherita',
            image: '/pancakes.png',
            description: 'Fresh tomatoes, mozzarella, and basil on thin crust',
            price: '18.99',
            stock: 12,
            rating: '4.6',
            reviews: [
                {
                    id: 1,
                    name: "Italian Chef Marco",
                    role: "Pizza Expert",
                    rating: 5,
                    text: "Authentic Italian taste! Fresh basil makes the difference."
                },
                {
                    id: 2,
                    name: "Sophie Turner",
                    role: "Food Blogger",
                    rating: 4,
                    text: "Classic and delicious. The thin crust is perfectly crispy."
                },
                {
                    id: 3,
                    name: "Alex Kumar",
                    role: "Customer",
                    rating: 5,
                    text: "Simple yet perfect. Fresh ingredients shine through."
                },
                {
                    id: 4,
                    name: "Nina Patel",
                    role: "Regular Customer",
                    rating: 5,
                    text: "My favorite pizza! Always fresh and tasty."
                }
            ]
        },
        {
            id: 5,
            name: 'Pepperoni',
            image: '/pancakes.png',
            description: 'Loaded with pepperoni slices and extra cheese',
            price: '20.99',
            stock: 20,
            rating: '4.8',
            reviews: [
                {
                    id: 1,
                    name: "Tony Romano",
                    role: "Pizza Lover",
                    rating: 5,
                    text: "Generous pepperoni portions! Exactly what I want in a pepperoni pizza."
                },
                {
                    id: 2,
                    name: "Kelly Johnson",
                    role: "Customer",
                    rating: 5,
                    text: "Best pepperoni pizza in town. Extra cheese is perfect!"
                },
                {
                    id: 3,
                    name: "Mark Thompson",
                    role: "Regular Customer",
                    rating: 5,
                    text: "Never disappoints. Pepperoni is high quality and flavorful."
                },
                {
                    id: 4,
                    name: "Rachel Green",
                    role: "Food Enthusiast",
                    rating: 4,
                    text: "Delicious! Could use even more pepperoni though."
                }
            ]
        },
        {
            id: 6,
            name: 'Hawaiian',
            image: '/pancakes.png',
            description: 'Ham, pineapple, and mozzarella cheese combination',
            price: '22.99',
            stock: 5,
            rating: '4.5',
            reviews: [
                {
                    id: 1,
                    name: "James Wilson",
                    role: "Hawaiian Pizza Fan",
                    rating: 5,
                    text: "Perfect sweet and savory combination. Fresh pineapple!"
                },
                {
                    id: 2,
                    name: "Linda Martinez",
                    role: "Customer",
                    rating: 4,
                    text: "Controversial but delicious. The ham quality is excellent."
                },
                {
                    id: 3,
                    name: "Steve Brown",
                    role: "Food Critic",
                    rating: 5,
                    text: "Don't let the haters fool you. This is amazing!"
                },
                {
                    id: 4,
                    name: "Amanda White",
                    role: "Regular Customer",
                    rating: 4,
                    text: "Sweet pineapple balances perfectly with salty ham."
                }
            ]
        },
    ],
    Sushi: [
        {
            id: 7,
            name: 'California Roll',
            image: '/pancakes.png',
            description: 'Crab, avocado, and cucumber wrapped in seaweed',
            price: '16.99',
            stock: 25,
            rating: '4.7',
            reviews: [
                {
                    id: 1,
                    name: "Yuki Tanaka",
                    role: "Sushi Chef",
                    rating: 5,
                    text: "Well-made California roll with fresh ingredients. Perfectly balanced."
                },
                {
                    id: 2,
                    name: "Jessica Lee",
                    role: "Food Blogger",
                    rating: 5,
                    text: "My favorite roll! Fresh avocado and real crab meat."
                },
                {
                    id: 3,
                    name: "Brian Chen",
                    role: "Regular Customer",
                    rating: 4,
                    text: "Consistently good. Great introduction to sushi."
                },
                {
                    id: 4,
                    name: "Melissa Kim",
                    role: "Customer",
                    rating: 5,
                    text: "Fresh and delicious! The avocado is always perfect."
                }
            ]
        },
        {
            id: 8,
            name: 'Salmon Sushi',
            image: '/pancakes.png',
            description: 'Fresh salmon over seasoned sushi rice',
            price: '24.99',
            stock: 18,
            rating: '4.9',
            reviews: [
                {
                    id: 1,
                    name: "Hiroshi Nakamura",
                    role: "Sushi Master",
                    rating: 5,
                    text: "Exceptional quality salmon. Melts in your mouth!"
                },
                {
                    id: 2,
                    name: "Sarah Park",
                    role: "Food Critic",
                    rating: 5,
                    text: "The freshest salmon sushi I've had outside Japan."
                },
                {
                    id: 3,
                    name: "Daniel Wong",
                    role: "Regular Customer",
                    rating: 5,
                    text: "Premium quality. You can taste the freshness."
                },
                {
                    id: 4,
                    name: "Emma Liu",
                    role: "Sushi Enthusiast",
                    rating: 5,
                    text: "Perfect rice to fish ratio. Absolutely delicious!"
                }
            ]
        },
        {
            id: 9,
            name: 'Mixed Platter',
            image: '/pancakes.png',
            description: 'Assorted sushi and sashimi selection for sharing',
            price: '45.99',
            stock: 10,
            rating: '4.8',
            reviews: [
                {
                    id: 1,
                    name: "Group Order - The Smiths",
                    role: "Family",
                    rating: 5,
                    text: "Perfect for sharing! Great variety and everything was fresh."
                },
                {
                    id: 2,
                    name: "Office Team",
                    role: "Corporate Customer",
                    rating: 5,
                    text: "Excellent for office lunch. Everyone found something they liked."
                },
                {
                    id: 3,
                    name: "Birthday Party",
                    role: "Event Order",
                    rating: 5,
                    text: "Great selection and presentation. Made our party special!"
                },
                {
                    id: 4,
                    name: "Date Night Couple",
                    role: "Regular Customers",
                    rating: 4,
                    text: "Perfect for two people to share. Good variety of rolls."
                }
                
            ]
        },
    ],
}


export const getAllProducts = () => {
    return Object.values(foodItems).flat();
};

// Helper function to find a product by ID
export const getProductById = (id) => {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === parseInt(id));
};


export default foodItems;