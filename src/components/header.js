"use client";

import Link from "next/link";
import classNames from "classnames";

export default function Header({ className }) {
  const defaultClasses =
    "flex flex-col items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold px-8 py-12 whitespace-nowrap";

  return (
    <header className={classNames(defaultClasses, className)}>
      <Link href="/">
        <h1>잔소리 키오스크</h1>
      </Link>
    </header>
  );
}
