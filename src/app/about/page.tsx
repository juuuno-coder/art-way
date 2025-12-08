// src/app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center">
      {/* 1. 인트로 섹션 */}
      <section className="text-center max-w-2xl mx-auto mb-24 animate-fade-in-up">
        <span className="text-blue-600 font-bold tracking-widest text-xs mb-6 block uppercase">
          Since 2024
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-10 text-gray-900">
          "오랜 시간 멈춰있던 공간이 <br></br> 예술의 숨결로 다시 깨어났습니다."{" "}
          <br />
        </h1>
        <p className="text-gray-600 leading-loose text-lg font-light break-keep">
          부산 동구 좌천동, 오랜 시간 멈춰있던 공간이 예술의 숨결로 다시
          깨어났습니다. 아트웨이 갤러리는 방치되었던 유휴 공간을 지역 예술가들의
          열정과 동구청의 협력으로 재탄생시킨 문화거점 공간입니다. 이번엔 어떤
          전시가 열릴까요?
        </p>
      </section>

      {/* 2. 이미지 섹션 (갤러리 전경) */}
      <section className="w-full h-[300px] md:h-[500px] relative bg-gray-100 mb-24 grayscale hover:grayscale-0 transition duration-700">
        {/* 나중에 실제 갤러리 사진을 public 폴더에 넣고 경로를 수정하세요 */}
        {/* <Image src="/gallery-view.jpg" alt="Artway View" fill className="object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif">
          [갤러리 전경 이미지]
        </div>
      </section>

      {/* 3. 비전 섹션 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-5xl mx-auto items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold border-b border-black pb-4 inline-block">
            History & Vision
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            부산포 개항과 기찻길의 시작과 종착지인 부산진의 역사적 가치를 품은
            이곳에서,
            <strong className="text-black font-medium">
              {" "}
              아트웨이 협동조합
            </strong>{" "}
            소속 작가들은 지역의 이야기를 기록하고 주민과 함께하는 다양한 예술
            프로그램을 만들어갑니다.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold border-b border-black pb-4 inline-block">
            Community
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            단순한 전시 공간을 넘어, 주민들이 오고 가며 들르고 아이들의
            웃음소리가 채워지는 사랑방이자 부산의 새로운 명소. 아트웨이 갤러리가
            여러분을 기다립니다.
          </p>
        </div>
      </section>
    </div>
  );
}
