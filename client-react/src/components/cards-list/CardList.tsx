import React from 'react';
import { Product } from '../../api/products';
import Card from '../card/Card';

import './card-list-style.css';

interface CardsListProps {
  products: Product[];
}

const CardsList: React.FC<CardsListProps> = ({ products }) => {
  return (
    <div>
      <div className="os-products-list">
        {products.length ? (
          products.map((item) => (
            <Card key={item.id} data={item} />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default CardsList;