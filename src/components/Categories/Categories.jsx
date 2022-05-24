import React from 'react';

export const Categories = ({ categoryId, onClickCategory }) => {
  const categories = ['Всі', 'Мʼясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onClickCategory(index)}
            key={index}
            className={categoryId === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
