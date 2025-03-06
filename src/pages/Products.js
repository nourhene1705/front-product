import React, { useState, useEffect } from "react";
import './produits.css';
import image1 from '../assets/TOP-FACE-LIP-GLOSS-VOLUME-N010.webp'; 
import image2 from '../assets/fondation.jpg'; 
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      {
        _id: 1,
        name: "Lip Gloss",
        description: "Gloss à lèvres volumisant pour un éclat intense.",
        price: "20",
        image: image1
      },
      {
        _id: 2,
        name: "Cute Fondation",
        description: "Fond de teint léger pour une couvrance naturelle et une peau radieuse",
        price: "25",
        image: image2 
      },
    ];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });
  
  const [editingProduct, setEditingProduct] = useState(null); 

  const navigate = useNavigate();
 
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const handleAddProduct = () => {
    setShowAddForm(true); 
  };

  const handleSubmitAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
     
      const updatedProducts = products.map(product => 
        product._id === editingProduct._id ? { ...editingProduct, ...newProduct } : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
     
      const newProductWithId = { ...newProduct, _id: products.length + 1 };
      setProducts([...products, newProductWithId]);
    }
    setShowAddForm(false);
    setNewProduct({ name: "", description: "", price: "", image: "" });
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(product => product._id === productId);
    setEditingProduct(productToEdit);
    setNewProduct(productToEdit); 
    setShowAddForm(true); 
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product._id !== productId)); 
  };

  return (
    <div className="products-container">
      <Header />
      <div className="logout-btn-container">
        <button className="deconnexion" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher des produits..." 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <button className="add-product-btn" onClick={handleAddProduct}>
        Ajouter un produit
      </button>

      {showAddForm && (
        <form className="add-product-form" onSubmit={handleSubmitAddProduct}>
          <input 
            type="text" 
            placeholder="Nom du produit" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Description du produit" 
            value={newProduct.description} 
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
          />
          <input 
            type="number" 
            placeholder="Prix du produit" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="URL de l'image" 
            value={newProduct.image} 
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
          />
          <button type="submit">
            {editingProduct ? "Mettre à jour le produit" : "Ajouter le produit"}
          </button>
        </form>
      )}

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Prix: {product.price} TND</p>

            <div className="admin-actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEditProduct(product._id)}
              >
                Modifier
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteProduct(product._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Products;

