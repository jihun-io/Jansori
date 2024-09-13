import React from "react";

const ProductItem = ({
  id,
  productName,
  price,
  isChecked,
  onCheckboxChange,
}) => {
  const handleClick = () => {
    onCheckboxChange();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCheckboxChange();
    }
  };

  return (
    <li
      className={`w-4/5 px-6 py-2 border-2 border-gray-200 rounded-2xl shadow-sm cursor-pointer flex items-center transition-colors hover:bg-supernova-200 dark:hover:bg-supernova-800 ${
        isChecked ? "bg-supernova-100 dark:bg-supernova-900" : ""
      }`}
      id={id}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      <div
        className={`w-6 h-6 border-2 border-gray-200 mr-4 rounded-sm transition-colors ${
          isChecked ? "bg-supernova-500" : "bg-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="black"
          className={`size-5 transition-opacity ${
            isChecked ? "opacity-1" : "opacity-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      <div>
        <p>{productName}</p>
        <p className="price font-bold">
          {parseInt(price).toLocaleString("ko-KR")}원
        </p>
      </div>
    </li>
  );
};

export default ProductItem;
