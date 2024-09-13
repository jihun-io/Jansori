"use client";

import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import { useProduct } from "/contexts/ProductContext";
import ProductItem from "@/components/product.js";

export default function BuyDetails({ token, name }) {
  const searchParams = useSearchParams();

  // 서버에서 전달받은 props가 없는 경우, 클라이언트에서 가져옵니다
  const clientToken = token || searchParams.get("token");
  const clientName = name || searchParams.get("name");

  if (!clientToken || !clientName) {
    return <div>Invalid parameters</div>;
  }
  const { products, checkedItems, handleCheckboxChange } = useProduct();

  const renderProductItems = (categoryProducts) => {
    return categoryProducts.map((product) => (
      <ProductItem
        key={product.id}
        id={product.id}
        productName={product.name}
        price={product.price}
        isChecked={checkedItems[product.id] || false}
        onCheckboxChange={() => handleCheckboxChange(product.id)}
      />
    ));
  };

  return (
    <main className="flex flex-col gap-16 justify-center mx-6">
      <section className="w-full pb-4">
        <h2 className="sr-only">소개</h2>
        <p className="text-center break-keep text-lg ">
          그간 무료로 제공되었던 <span className="font-bold">{clientName}</span>
          에 대한 걱정은 올해부터 <span className="font-bold">유료 서비스</span>
          로 전환되었으니,
          <br />
          선결제 후 이용 부탁드립니다 🙏
        </p>
      </section>
      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">베스트</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.bestProducts)}
        </ul>
      </section>
      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">수험생</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.studentProducts)}
        </ul>
      </section>

      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">대학생·취준생</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.collegeProducts)}
        </ul>
      </section>

      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">직장인</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.workerProducts)}
        </ul>
      </section>

      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">
          솔로들을 위한 특별 코너
        </h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.singleProducts)}
        </ul>
      </section>

      <section className="w-full pb-4">
        <h2 className="text-3xl font-bold text-center my-4">기혼</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.marriedProducts)}
        </ul>
      </section>
    </main>
  );
}
