"use client";

import Link from "next/link";
import classNames from "classnames";

export default function Header({ className }) {
  const defaultClasses =
    "flex flex-col items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold px-8 py-12 whitespace-nowrap";

  return (
    <header className={classNames(defaultClasses, className)}>
      <Link
        href="/"
        className=" text-supernova-500 hover:text-supernova-700 transition-colors"
      >
        <h1 className="[text-shadow:_1.5px_3px_0.5px_rgb(24_24_24_/_90%)]">
          잔소리 키오스크
        </h1>
      </Link>
    </header>
  );
}
