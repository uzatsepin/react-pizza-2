import React, { memo } from 'react';
type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(({ categoryId, onChangeCategory }) => {
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
});
