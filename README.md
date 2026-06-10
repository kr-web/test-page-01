# KurlyPay PG 시스템 — Back Office

컬리페이 PG 시스템 백오피스 화면설계서 **v0.12 (2022-03-16)** 를 기반으로 구현한 React 데모입니다.

## 기술 스택
- React 18 + Vite
- React Router v6
- 순수 CSS (컬리 퍼플 테마 디자인 토큰)

## 실행
```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 로그인 (데모)
- 아이디: `admin` / 비밀번호: `1234`
- 로그인 → Slack 인증코드(아무 값) 입력 → 메인 진입
- 로그인 5회 실패 시 계정 잠금 안내 모달 노출
- 아이디 찾기 / 비밀번호 찾기 (Slack·e-mail 채널) 구현

> 로그인 인증을 위한 외부 크롤링은 별도 웹에서 처리하므로 본 프로젝트에서는 다루지 않습니다.

## 구현 화면 (설계서 전 메뉴)
- **결제관리** — 전체 거래내역 / 전체 거절내역 / 신용카드·간편결제 거래내역 조회(건별·요약, 상세검색, 취소요청·매출전표 모달) / 중복거래 예상 / 매출통계(기간별·결제수단별)
- **정산관리** — 승인내역 / 정산내역 / 마감내역 / 반송·부분 취소내역 / 부가세 신고 참고자료 / 영중소 차액정산내역
- **상점관리** — 상점정보(기본·계약·부가/담당자·카드사 프로모션) / 정보변경(비밀번호·입금계좌·관리자 권한·로그인 인증정보)
- **회원관리** — 가입/탈퇴 조회 / 결제수단 조회 / 회원통계(매출·가입/탈퇴)
- **가맹점관리** — 가맹점 등록/조회 + 등록 폼 / 계약 조회 / 거래조회 / 정산·마감내역 / 통계
- **시스템** — 다운로드 관리 / 계정관리(등록·수정·권한그룹 모달) / 메뉴관리(트리) / 권한그룹 관리(권한메뉴 설정) / 공통코드 관리 / 공휴일 관리

## 데이터
모든 표는 **목업(가짜) 데이터**로 채워져 있어 조회·페이징·필터·모달이 동작하는 것처럼 보입니다.
실제 API 연동은 `src/data/mock.js` 의 생성 함수를 교체하면 됩니다.

## 구조
```
src/
  data/        메뉴 트리(menu.js) · 공통코드(codes.js) · 목업(mock.js)
  components/
    layout/    Header · Sidebar · Footer · BackofficeLayout · Screen
    ui/        SearchPanel · DataTable · Summary · controls · Modal · Logos · Placeholder
  pages/
    auth/      로그인 · 인증코드 · 아이디/비밀번호 찾기
    payments/ settlement/ store/ member/ merchant/ system/
  App.jsx      라우팅
  main.jsx     엔트리
```
