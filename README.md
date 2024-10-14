# frontend_day30__reference_code
1. 공통
    - [ ]  완성된 day29 폴더를 활용하여 day30을 완성해 주세요.
    - [ ]  레이아웃으로 사용할 컴포넌트를 src/commons/layout 경로에 만들어 줍니다.
        - [ ]  src/commons/layout/navigation/index.tsx 경로에 내비게이션UI를 새롭게 작성합니다.
        - [ ]  src/commons/layout/banner/index.tsx 경로에 게시글목록에서 만들었었던
        src/components/boards-list/banner/index.tsx 경로의 코드를 이동시켜 줍니다.
        - [ ]  src/commons/layout/index.tsx 경로에서 내비게이션, 배너 2개의 컴포넌트를 조립합니다.
        - [ ]  게시글등록, 게시글수정 2개의 페이지에서는 배너를 노출시키지 않습니다.
        - [ ]  완성된 레이아웃 컴포넌트를 src/app/layout.tsx 경로에 불러와서 조립합니다.(children을 감싸주세요.)
2. 컴포넌트[리팩토링]
    - [ ]  레이아웃내비게이션, 레이아웃배너 컴포넌트의 파일을 보완해 주세요.
        - [ ]  타입에러가 감지되어 빨간 밑줄이 그어지는 부분에 타입스크립트를 적용하여 문제를 해결해 주세요.
        - [ ]  유지보수가 쉽도록 파일을 hook.ts, index.tsx, queries.ts, styles.ts, types.ts 로 분리해 주세요.
