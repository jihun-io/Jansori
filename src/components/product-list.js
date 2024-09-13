"use client";

import React from "react";
import CheckboxItem from "./product.js";

const CheckboxList = ({ categoryId, listId, items }) => {
  const { getCheckedCount } = useCheckbox();

  return (
    <div className="mb-4">
      <h3>리스트 {listId}</h3>
      <ul>
        {items.map((item) => (
          <CheckboxItem
            key={item.id}
            categoryId={categoryId}
            listId={listId}
            {...item}
          />
        ))}
      </ul>
      <p>선택된 아이템: {getCheckedCount(categoryId, listId)}</p>
    </div>
  );
};

export default CheckboxList;
