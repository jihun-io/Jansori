"use client";
import React, { createContext, useState, useContext, useCallback } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    bestProducts: [
      { id: "best1", name: "살 좀 빼야겠다~", price: "49900" },
      {
        id: "best2",
        name: "부모님 좀 자주 찾아 뵈어라.",
        price: "59900",
      },
      {
        id: "best3",
        name: "언제까지 게임만 하고 살래?",
        price: "49900",
      },
    ],

    studentProducts: [
      {
        id: "student1",
        name: "공부는 열심히 하고 있니?",
        price: "49900",
      },
      {
        id: "student2",
        name: "요즘 학교 성적은 어떠니?",
        price: "64900",
      },
      { id: "student3", name: "어느 대학 갈 거니?", price: "69900" },
      {
        id: "student4",
        name: "핸드폰 그만하고 공부 좀 해라.",
        price: "64900",
      },
    ],

    collegeProducts: [
      {
        id: "collegeProduct1",
        name: "학점 관리 잘하고 있니?",
        price: "74900",
      },
      {
        id: "collegeProduct2",
        name: "취업 준비는 언제부터 할 거니?",
        price: "79900",
      },
      {
        id: "collegeProduct3",
        name: "대학 생활에 놀기만 하면 안 돼.",
        price: "84900",
      },
      {
        id: "collegeProduct4",
        name: "아직도 취업 준비 하고 있니?",
        price: "89900",
      },
    ],

    workerProducts: [
      {
        id: "worker1",
        name: "회사에서 연봉은 얼마나 받니?",
        price: "89900",
      },
      { id: "worker2", name: "돈은 많이 모았어?", price: "99900" },
      { id: "worker3", name: "그 회사 비전은 있니?", price: "94900" },
      {
        id: "worker4",
        name: "나이가 있는데 빨리 결혼 안 하면 늦어.",
        price: "94900",
      },
    ],

    singleProducts: [
      { id: "single1", name: "만나는 사람은 있어?", price: "94900" },
      {
        id: "single2",
        name: "결혼 할 생각은 있는 거니?",
        price: "94900",
      },
      { id: "single3", name: "소개팅 시켜 줄까?", price: "99900" },
      {
        id: "single4",
        name: "손주 한번 보게 해 줘라!",
        price: "99900",
      },
    ],

    marriedProducts: [
      {
        id: "married1",
        name: "아기 가질 때 되지 않았니?",
        price: "129900",
      },
      {
        id: "married2",
        name: "아이 하나는 외롭지 않겠니?",
        price: "149900",
      },
      {
        id: "married3",
        name: "애는 남 손에 맡기지 말고 네가 봐라.",
        price: "154900",
      },
      { id: "married4", name: "집은 아직도 전세야?", price: "174900" },
    ],
  });
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = useCallback((id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const getCheckedProducts = useCallback(() => {
    return Object.entries(checkedItems)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => {
        for (const category in products) {
          const product = products[category].find((p) => p.id === id);
          if (product) return product;
        }
        return null;
      })
      .filter((product) => product !== null);
  }, [checkedItems, products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        checkedItems,
        handleCheckboxChange,
        getCheckedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
