import cartEmptyImg from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пуста <icon>😞</icon>
        </h2>
        <p>
          Скоріш за все, ви не замовляли ще піццу. <br />
          Для того,щоб замовити піццу, перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
};
