import React from 'react';
import Card from '../card/Card';
import './card-list-style.css';
import { Product } from '../../models/Product';

interface CardsListProps {
  products: Product[];
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
}

const CardsList: React.FC<CardsListProps> = ({ products, onAddToCart, onRemoveFromCart }) => {
  return (
    <div>
      <div className="os-products-list" data-element="body">
        {products.length ? (
          products.map((item) => (
            <Card
              key={item.id}
              data={item}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default CardsList;