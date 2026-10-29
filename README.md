# AI Paper Reading Study

## 파일 역할

* index.html: 페이지 구조와 메뉴
* style.css: 디자인
* posts.js: 발표 기록, 요약, PDF 경로
* members.js: 멤버 소개
* app.js: 데이터로 화면을 만드는 코드 (보통 수정 불필요)
* slides/: 발표 PDF 보관
* .nojekyll: Jekyll 처리 생략 (숨김 파일이 표시되지 않으면 GitHub Add file → Create new file에서 생성 가능)

## 발표자료 게시

GitHub에서 PDF와 posts.js를 수정하면 배포 후 반영됩니다.

1. 발표자료를 PDF로 내보냅니다. 파일명은 `2026-10-28-paper-title.pdf`처럼 영문·숫자·하이픈을 사용하세요.
2. 저장소에 `slides/` 폴더를 만듭니다. GitHub의 Add file → Create new file에서 `slides/.gitkeep` 파일을 만들면 됩니다. 이미 폴더가 있으면 생략합니다.
3. slides 폴더를 연 뒤 Add file → Upload files로 PDF를 업로드하고 Commit changes 합니다.
4. posts.js를 열고 연필(Edit) 버튼을 누릅니다.
5. `const posts = \[` 다음에 아래 항목을 추가합니다. 새 글을 앞에 놓으면 첫 번째 카드가 됩니다. 항목 사이의 쉼표를 유지하세요.
6. 처음 실제 글을 등록할 때 기존 example:true인 세 항목을 지우면 예시 게시물과 미리보기 안내가 사라집니다.
7. Commit changes 후 Actions의 배포 완료를 확인합니다.

```js
{

id: "2026-09-16-paper-title",

number: "01", // 우리 스터디 회차 번호

example: false, // 딱히 상관 없음

topic: ["NLP", "Retrieval", "Multilingual"],

title: "논문 제목",

subtitle: "부제목 (논문 자체의 부제목으로 쓰거나 자기가 새로 쓰거나 맘대로...)",

cover: "CLEAR", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X

presenter: "발표자 이름",

date: "2026-09-16", // 발표 날짜

paper: "https://arxiv.org/abs/실제논문번호",

author: "논문 저자 이름",

venue: "학회 / 저널명 (예: NeurIPS 2026)",

code: "", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능

pdf: "slides/2026-09-16-paper-title.pdf",

summary: "한 문장 요약",

discussion: `### 마크다운 형식 사용 가능



#### 1. 첫 번째 주제



논의 내용 **강조 가능**

- 리스트 작성 가능

- 리스트 작성 가능



#### 2. 두 번째 주제
`

},
```

* id는 글마다 다르게 작성하세요.
* number는 카드의 표시 번호입니다. 자동으로 재정렬되지 않습니다.
* topic에 새 주제를 쓰면 필터가 자동으로 추가됩니다. 같은 주제는 표기를 통일하세요.
* pdf는 실제 파일 경로와 대소문자까지 일치해야 합니다. 경로 앞에 /를 붙이지 마세요.
* 글 본문은 일반 텍스트입니다. Markdown이나 HTML은 렌더링하지 않습니다. 줄바꿈은 \\n을 사용하세요.
* 문자열 안에 큰따옴표를 넣으려면 "로 작성하세요.
* paper, code가 빈 문자열이면 링크가 표시되지 않습니다.
* PDF 미리보기를 지원하지 않는 브라우저에서는 PDF 열기 / 저장 링크를 사용합니다.
* .md 파일만 올려서는 새 카드가 생성되지 않습니다. posts.js에 항목을 추가해야 합니다.

## 멤버 소개 수정

members.js에서 각 사람의 따옴표 안 값을 수정합니다.

```js
const members = [
  {
    name: "첫 번째 이름",
    school: "대학교 이름",
    department: "학과 이름",
    github: "https://github.com/계정명",
    email: "name@example.com"
  },
  {
    name: "두 번째 이름",
    school: "대학교 이름",
    department: "학과 이름",
    github: "https://github.com/계정명",
    email: "name2@example.com"
  }
];
```

빈 값은 입력 예정으로 표시됩니다. GitHub는 새 탭에서 열리고 이메일은 기본 이메일 앱으로 연결됩니다. 이름·이메일 등에는 실제 공개할 정보를 넣으세요.

## 공동 운영

저장소 Settings → Collaborators에서 GitHub 계정을 초대하면 함께 수정할 수 있습니다. 동시 수정 충돌을 줄이려면 서로 다른 브랜치에서 편집 후 Pull request로 합치거나, 번갈아 수정하세요.

## 문제가 생기면

* 사이트가 안 열림: Settings → Pages의 브랜치와 /(root), 루트의 index.html을 확인합니다.
* 수정이 안 보임: Actions의 배포 완료를 확인한 뒤 Ctrl+Shift+R로 새로고침합니다.
* 카드가 사라짐: posts.js의 쉼표, 따옴표, 대괄호를 확인합니다.
* PDF 404: 경로와 파일 이름 및 대소문자를 확인합니다.
* GitHub 웹 업로드 파일 한도는 파일당 25 MiB입니다. 더 큰 PDF는 압축하거나 Git으로 올리세요. 일반 Git 저장소는 100 MiB 초과 파일을 차단합니다.

