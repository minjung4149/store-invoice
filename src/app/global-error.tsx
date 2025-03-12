"use client"; // 클라이언트 컴포넌트 선언

export default function GlobalError({error, reset}: { error: Error; reset: () => void }) {
  console.log("🚀 [error.tsx] GlobalError 컴포넌트 실행됨"); // 디버깅용 로그
  console.log("🔥 [error.tsx] 발생한 에러:", error);
  return (
    <div>
      <h2>오류 발생: {error.message}</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
