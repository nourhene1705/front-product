import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} TND</p>
    </div>
  );
};

export default ProductCard;
