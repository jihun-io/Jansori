"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const url = new URL(window.location.href);
  const origin = url.origin;
  const demoLink = `${origin}/buy?name=jihun&token=https://dev.jihun.io`;

  return (
    <main className="flex flex-col gap-16 justify-start mx-6">
      <section className="introduction">
        <h2 className="sr-only">소개</h2>
        <p className="text-2xl break-keep font-bold text-center">
          &quot;참을 인(忍)도 쓰면 돈이 됩니다!&quot;
        </p>
        <p className="my-4">
          민족의 대명절 추석이 다가오는데, 전혀 즐겁지 않으시다고요?
          <br />
          올해도 어김없이 끝없는 잔소리의 홍수 속에 빠질까 봐 벌써부터
          걱정이신가요?
        </p>
        <p className="my-4">
          이제, 잔소리를 들을 상황이라면 잔소리 키오스크를 열어서 보여주세요!
        </p>
      </section>
      <section>
        <p className="my-4 ">
          잔소리 키오스크는 당신의 명절을 변화시킬 혁명적인 서비스입니다. 더
          이상 잔소리를 그저 참기만 하지 마세요. 이제 그것을 현금으로 바꿀 수
          있습니다!
        </p>
        <p className="my-4 ">
          수험생, 대학생, 직장인, 솔로 여러분이 매년 듣는 뻔한 레퍼토리는 모두
          준비되어 있습니다. 가벼운 잔소리는 49,900원부터, 인생 대서사시급
          잔소리는 174,900원까지!
        </p>
        <p className="my-4 ">
          이제 당신의 미래는 확실해집니다. 잔소리가 사라지거나, 아니면 당신의
          지갑이 두툼해지거나.
        </p>
        <p className="my-4 text-xs">
          PS: 혹시 잔소리가 줄어들더라도 실망하지 마세요. 어쨌든 이긴 겁니다!
        </p>
      </section>
      <section className="try-it">
        <ul className="flex flex-row flex-wrap w-full justify-center mt-6 gap-x-16 gap-y-4">
          <li>
            <Link
              className="block dark:text-black font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
              href="/create"
            >
              나만의 키오스크 만들기
            </Link>
          </li>
          <li>
            <Link
              className="block dark:text-black font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
              href={demoLink}
            >
              데모
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
