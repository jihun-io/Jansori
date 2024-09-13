"use client";

import { useState, useEffect } from "react";

export function useToHexValue() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const toHexValue = (value) => {
    if (!isBrowser) return ""; // 서버 사이드에서는 빈 문자열 반환

    // BigInt를 사용하여 큰 숫자 처리
    const bigIntValue = BigInt(Math.floor(value * 524288));
    return bigIntValue.toString(16);
  };

  return toHexValue;
}
