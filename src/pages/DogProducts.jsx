import React from 'react';
import './DogProducts.css';

const products = [
  { name: 'Dog Food', description: 'High-quality dog food for all breeds.', link: 'https://www.amazon.com/dog-food', image: 'https://headsupfortails.com/cdn/shop/files/8906002482832_20kg.jpg?v=1738409894' },
  { name: 'Dog Toy', description: 'Durable and fun dog toys.', link: 'https://www.amazon.com/dog-toy', image: 'https://headsupfortails.com/cdn/shop/files/8906002482832_20kg.jpg?v=1738409894' },
  { name: 'Dog Bed', description: 'Comfortable beds for your dog.', link: 'https://www.amazon.com/dog-bed', image: 'https://headsupfortails.com/cdn/shop/files/8906002482832_20kg.jpg?v=1738409894' },
  { name: 'Dog Leash', description: 'Strong and reliable dog leashes.', link: 'https://www.amazon.com/dog-leash', image: "https://headsupfortails.com/cdn/shop/files/8906002482832_20kg.jpg?v=1738409894" },
  { name: 'Dog Collar', description: 'Stylish and safe dog collars.', link: 'https://www.amazon.com/dog-collar', image: 'https://headsupfortails.com/cdn/shop/files/8906002482832_20kg.jpg?v=1738409894' }
];

const DogProducts = () => {
  return (
    <div className="dog-products">
      <h1>Dog Products</h1>
      <div className="product-cards">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogProducts;
