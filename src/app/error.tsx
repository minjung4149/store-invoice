"use client"; // ✅ 클라이언트 컴포넌트 선언

import {useEffect} from "react";

export default function GlobalError({
                                      error,
                                      reset,
                                    }: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🔥 [error.tsx] 발생한 에러:", error);
  }, [error]);

  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h2>🚨 오류 발생: {error.message}</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
