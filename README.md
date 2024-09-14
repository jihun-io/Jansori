# 잔소리 키오스크
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>

![image](https://github.com/user-attachments/assets/ed2a53dd-fa44-4cf0-9f1c-415d482d3af8)

- 보러 가기: https://jansori.jihun.io

## 프로젝트 시작 취지
언젠가부터 명절마다 인터넷에 도는 ['잔소리 가격표'](https://www.google.com/search?sca_esv=28a657a2e876b5fc&sxsrf=ADLYWIJr_yqGeNUp9b5izKMMdko_jPBzxw:1726347662988&q=%EC%9E%94%EC%86%8C%EB%A6%AC+%EA%B0%80%EA%B2%A9%ED%91%9C&udm=2&fbs=AEQNm0DmKhoYsBCHazhZSCWuALW8l8eUs1i3TeMYPF4tXSfZ9zKNKSjpwusJM2dYWg4btGKvTs8msUkFt41RLL2EsYFXj1HJ-6Tz3zY-OaA8p5OIwItbocDk4qq86p8fJJCtbe3_2vimBnUgRwZhItF5qoYQaFE2UOeb1HzBnvjMvmHOhQgvZ1W__w-vNv-qb6FIYxwRlN9p&sa=X&ved=2ahUKEwiThdiZqsOIAxXfZfUHHXTmOlsQtKgLegQIDxAB&biw=1372&bih=931&dpr=2)를 보고서, 잔소리 가격표를 키오스크로 만들면 재밌을 것 같다는 영감을 받았습니다.

명절은 누구나 즐겁고 평안해야 한다고 생각합니다. 그렇지만 매해 명절마다 소셜 미디어를 들어가 보면 가족이나 친척 간 갈등이 인기 글에 올라오고, 명절에 행복보다 아픔을 갖는 사람들을 제 주변에서도 종종 보곤 했습니다. 즐거운 명절 날에 고통받는 모든 사람들을 위해서 프로젝트를 시작했지만, 프로젝트를 진행하면서 "과연 잔소리 키오스크가 진정한 명절 갈등 해법일 수 있을까?"라는 솔직한 생각이 들었습니다. 

잔소리 키오스크는 그저 조그마한 재밋거리로 즐겨 주시고, 잔소리 키오스크를 이용해서 많은 잔소리와 많은 금액을 얻어가기보다는, 적은 잔소리와 큰 행복을 얻어가셨으면 좋겠습니다. 즐거운 한가위 되시길 바랍니다!

## 주요 기능
- 자신의 이름과 카카오페이 송금 링크를 입력하여 나만의 잔소리 키오스크를 만들 수 있습니다.
- 생성된 잔소리 키오스크 링크를 카카오톡으로 친구에게 공유할 수 있습니다.
- 생성된 잔소리 키오스크에 접속하여 원하는 잔소리를 장바구니에 담아 잔소리 금액의 합계를 카카오페이로 송금할 수 있습니다.

## 작동 원리
- 나만의 잔소리 키오스크를 생성하면 URL에 '이름'과 '카카오페이 송금 링크'가 각각 파라미터로 기록되어 생성됩니다.
- 나만의 잔소리 키오스크 링크에 접속하면 웹 페이지가 파라미터 값을 불러와서 이름과 카카오페이 송금 링크를 제공합니다. 


## 중점 사항
나만의 잔소리 키오스크를 만들기 위해서는 '이름' 데이터와 '카카오페이 송금 링크' 데이터가 필요합니다. 그렇지만 이 데이터를 수집하여 서버에 저장하는 것은 다소 민감할 수 있으며, 데이터베이스를 사용할 만큼의 큰 데이터도 아니라고 판단했습니다. 그렇기 때문에 서버리스 컴퓨팅(Cloudflare Pages)을 선택하였고, 필요한 데이터는 URL의 파라미터에 데이터를 기록하여 처리했습니다.

잔소리 키오스크에서 잔소리를 결제할 때의 경험을 다소 고민했습니다. 카카오페이 송금 버튼을 누른 후에 사용자가 합계 금액을 입력하는 것은 번거로울 뿐만 아니라 좋은 경험이 아니라고 생각했습니다. 잔소리 키오스크 개발 직전에 자료를 조사하면서 이를 해결할 수 있는 방법을 찾았습니다. 송금 링크 뒤에 오는 특정 문자열이 송금 화면의 기본 금액 값을 결정한다는 것이었습니다. 이 덕분에 잔소리 키오스크에서 송금하기 버튼을 눌렀을 때, 장바구니에 담은 잔소리의 합계 금액을 카카오페이 송금 화면의 기본 값으로 적용할 수 있었습니다. 제가 읽었던 글은 다음과 같습니다. [[Flutter] kakaolink로 kakaopay 돈 요청하기, LOCKED.](https://velog.io/@locked/Flutter-kakaolink%EB%A1%9C-kakaopay-%EB%8F%88-%EC%9A%94%EC%B2%AD%ED%95%98%EA%B8%B0)

## 제작 기간
- 개발 시작: 2024년 9월 13일
- 배포: 2024년 9월 15일

## 기술 스택
- Next.js
- Tailwind CSS
- Cloudflare Pages
- 카카오톡 공유 API
