"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useProduct } from "/contexts/ProductContext";
import ProductItem from "@/components/product.js";

export default function BuyDetails({ token, name }) {
  const { products, checkedItems, handleCheckboxChange } = useProduct();
  const searchParams = useSearchParams();

  const clientToken = token || searchParams.get("token");
  const clientName = name || searchParams.get("name");

  if (!clientToken || !clientName) {
    return <div>Invalid parameters</div>;
  }

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
        <h2 className="text-3xl font-bold text-center my-4">베스트셀러</h2>
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
        <h2 className="text-3xl font-bold text-center my-4">신혼 부부</h2>
        <ul className="flex flex-col items-center gap-6">
          {renderProductItems(products.marriedProducts)}
        </ul>
      </section>
      <section className="w-full pb-4">
        <h2 className="sr-only">나만의 잔소리 키오스크 만들기</h2>
        <p className="text-3xl font-bold text-center my-4">
          잔소리를 구매하고 싶지 않으신가요?
        </p>
        <p className="text-center pb-4">
          그렇다면 직접 잔소리를 판매해보는 건 어떠세요? <br />
          금방 만들어요! 한번 만들어서 공유해보세요!
        </p>
        <Link
          className="block w-fit ml-auto mr-auto dark:text-black font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
          href="/create"
        >
          나만의 잔소리 키오스크 만들러 가기!
        </Link>
      </section>
    </main>
  );
}
