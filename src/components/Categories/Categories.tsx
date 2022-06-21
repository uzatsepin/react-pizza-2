import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: any;
}

export const Categories:React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
  const categories = ['Всі', 'Мʼясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            key={index}
            className={categoryId === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
