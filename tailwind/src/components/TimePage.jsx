import { useEffect, useState } from "react";
import BgImage from "../assets/bg.jpg";

export default function TimePage() {
  // useState로 현재 시각 저장
  const [time, setTime] = useState("");

  // useState로 남은 시간 저장
  const [count, setCount] = useState(10);

  // 0초가 되면 시간 종료 메시지로 변경
  const [isFinished, setIsFinished] = useState(false);

  const [activeTab, setActiveTab] = useState("clock");

  // 현재 시각은 항상 1초마다 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();

      setTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // timer 탭일 때만 카운트다운 실행
  useEffect(() => {
    if (activeTab !== "timer") return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFinished(true);

          // 콘솔문은 타이머가 종료되었을 때만 출력
          console.log("타이머 종료");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    // cleanup 함수로 clearInterval
    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  let content;

  if (activeTab === "clock") {
    content = (
      <div className="bg-white/75 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center w-96">
        <h2 className="font-es text-2xl font-bold text-slate-700 mb-2">
          현재 시각
        </h2>

        <p className="font-es text-sm text-slate-400 mb-6">
          1초마다 시간이 업데이트됩니다
        </p>

        <p className="font-es text-4xl font-bold text-indigo-400">
          {time}
        </p>
      </div>
    );
  } else {
    if (isFinished) {
      content = (
        <div className="bg-white/75 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center w-96">
          <h2 className="font-es text-2xl font-bold text-slate-700 mb-6">
            카운트다운
          </h2>

          <p className="font-es text-3xl font-bold text-rose-300">
            💥 시간 종료!
          </p>
        </div>
      );
    } else {
      content = (
        <div className="bg-white/75 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center w-96">
          <h2 className="font-es text-2xl font-bold text-slate-700 mb-2">
            카운트다운
          </h2>

          <p className="font-es text-sm text-slate-400 mb-6">
            10초부터 0초까지 감소합니다
          </p>

          <p className="font-es text-4xl font-bold text-indigo-400">
            남은 시간 : {count}초
          </p>
        </div>
      );
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-24 px-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className="text-center mb-8 max-w-xl">
        <p className="font-es text-violet-300 font-semibold mb-2">
          useEffect 타이머 예제
        </p>

        <h1 className="font-es text-3xl md:text-5xl font-bold text-slate-700 mb-4 leading-tight">
          실시간 시계 & 카운트다운 타이머
        </h1>

        <p className="font-es text-slate-400 leading-relaxed">
          컴포넌트 마운트, 언마운트, cleanup 동작을 확인할 수 있는 예제입니다.
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("clock")}
          className="font-es px-5 py-2 rounded-xl bg-white/80 hover:bg-pink-100 text-slate-600 shadow transition"
        >
          시계 보기
        </button>

        <button
          onClick={() => {
            setActiveTab("timer");
            setCount(10);
            setIsFinished(false);
          }}
          className="font-es px-5 py-2 rounded-xl bg-white/80 hover:bg-yellow-100 text-slate-600 shadow transition"
        >
          타이머 보기
        </button>
      </div>

      <p className="font-es text-sm text-slate-400 bg-white/70 px-4 py-2 rounded-full mb-6">
        현재 보기 : {activeTab === "clock" ? "시계" : "카운트다운"}
      </p>

      {content}
    </div>
  );
}