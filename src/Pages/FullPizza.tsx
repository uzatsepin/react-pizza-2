import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://628b53477886bbbb37b5ad90.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (err) {
        alert('Пицца не найдена');
        navigate('/');
      }
    }
    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div>
        <img className="pizza-block" src={pizza.imageUrl} alt={pizza.title} />
        <h2 className="pizza-block__title">{pizza.title}</h2>
        <h4 className="pizza-block__price">{pizza.price} &#8372;</h4>
      </div>
    </div>
  );
};
