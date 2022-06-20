import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza = () => {
  const [pizza, setPizza] = useState({});
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

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} &#8372;</h4>
    </div>
  );
};
