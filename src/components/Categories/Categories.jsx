import React, { useState } from 'react';

const Categories = () => {
  const categories = ['Всі', 'Мʼясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => setActiveIndex(index)}
            key={index}
            className={activeIndex === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
