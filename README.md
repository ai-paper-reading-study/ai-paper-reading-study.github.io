# AI Paper Reading Study — 운영 안내

## 1. GitHub Pages 배포
1. ZIP을 압축 해제합니다.
2. GitHub에서 Public 저장소 `ai-paper-reading-study`를 만듭니다.
3. Add file → Upload files에서 압축 해제한 파일들을 업로드하고 Commit changes를 누릅니다. ZIP 자체나 바깥 폴더가 아니라 index.html이 저장소 첫 화면에 바로 보이도록 올립니다.
4. Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, 폴더: /(root) → Save.
5. Actions에서 배포가 완료되면 Settings → Pages의 Visit site로 확인합니다.
6. 주소는 https://사용자명.github.io/ai-paper-reading-study/ 입니다.

사용자 대표 주소 https://사용자명.github.io/ 를 원하면 저장소 이름을 사용자명.github.io 로 만드세요. 기존 개인 홈페이지가 있다면 별도의 ai-paper-reading-study 저장소를 쓰면 됩니다.

공식 문서:
https://docs.github.com/en/pages/quickstart
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 2. 파일 역할
- index.html: 페이지 구조와 메뉴
- style.css: 디자인
- posts.js: 발표 기록, 요약, PDF 경로
- members.js: 멤버 소개
- app.js: 데이터로 화면을 만드는 코드 (보통 수정 불필요)
- slides/: 발표 PDF 보관
- .nojekyll: Jekyll 처리 생략 (숨김 파일이 표시되지 않으면 GitHub Add file → Create new file에서 생성 가능)

## 3. 발표자료 게시
이 사이트는 정적 사이트이므로 사이트 안에서 업로드하는 관리 화면은 없습니다. GitHub에서 PDF와 posts.js를 수정하면 배포 후 반영됩니다.

1. 발표자료를 PDF로 내보냅니다. 파일명은 `2026-10-28-paper-title.pdf`처럼 영문·숫자·하이픈을 사용하세요.
2. 저장소에 `slides/` 폴더를 만듭니다. GitHub의 Add file → Create new file에서 `slides/.gitkeep` 파일을 만들면 됩니다. 이미 폴더가 있으면 생략합니다.
3. slides 폴더를 연 뒤 Add file → Upload files로 PDF를 업로드하고 Commit changes 합니다.
4. posts.js를 열고 연필(Edit) 버튼을 누릅니다.
5. `const posts = [` 다음에 아래 항목을 추가합니다. 새 글을 앞에 놓으면 첫 번째 카드가 됩니다. 항목 사이의 쉼표를 유지하세요.
6. 처음 실제 글을 등록할 때 기존 example:true인 세 항목을 지우면 예시 게시물과 미리보기 안내가 사라집니다.
7. Commit changes 후 Actions의 배포 완료를 확인합니다.

```js
{
  id: "2026-10-28-paper-title",
  number: "01",
  example: false,
  topic: "Multimodal",
  title: "논문의 실제 제목",
  subtitle: "카드에 표시할 짧은 설명",
  cover: "Multimodal\nLearning",
  presenter: "발표자 이름",
  date: "2026-10-28",
  paper: "https://arxiv.org/abs/실제논문번호",
  code: "",
  pdf: "slides/2026-10-28-paper-title.pdf",
  summary: "한 문장 요약",
  limitations: "기존 방식의 한계",
  method: "제안 방법의 핵심",
  evaluation: "데이터셋, 비교 대상, 평가 지표와 결과",
  discussion: "질문 1과 논의 내용\n질문 2와 후속 연구 아이디어",
  references: "추가 참고 자료"
},
```

- id는 글마다 다르게 작성하세요.
- number는 카드의 표시 번호입니다. 자동으로 재정렬되지 않습니다.
- topic에 새 주제를 쓰면 필터가 자동으로 추가됩니다. 같은 주제는 표기를 통일하세요.
- pdf는 실제 파일 경로와 대소문자까지 일치해야 합니다. 경로 앞에 /를 붙이지 마세요.
- 글 본문은 일반 텍스트입니다. Markdown이나 HTML은 렌더링하지 않습니다. 줄바꿈은 \n을 사용하세요.
- 문자열 안에 큰따옴표를 넣으려면 \"로 작성하세요.
- paper, code가 빈 문자열이면 링크가 표시되지 않습니다.
- PDF 미리보기를 지원하지 않는 브라우저에서는 PDF 열기 / 저장 링크를 사용합니다.
- .md 파일만 올려서는 새 카드가 생성되지 않습니다. posts.js에 항목을 추가해야 합니다.

## 4. 멤버 소개 수정
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

## 5. 공동 운영
저장소 Settings → Collaborators에서 동기의 GitHub 계정을 초대하면 함께 수정할 수 있습니다. 동시 수정 충돌을 줄이려면 서로 다른 브랜치에서 편집 후 Pull request로 합치거나, 번갈아 수정하세요.

## 6. 문제가 생기면
- 사이트가 안 열림: Settings → Pages의 브랜치와 /(root), 루트의 index.html을 확인합니다.
- 수정이 안 보임: Actions의 배포 완료를 확인한 뒤 Ctrl+Shift+R로 새로고침합니다.
- 카드가 사라짐: posts.js의 쉼표, 따옴표, 대괄호를 확인합니다.
- PDF 404: 경로와 파일 이름 및 대소문자를 확인합니다.
- GitHub 웹 업로드 파일 한도는 파일당 25 MiB입니다. 더 큰 PDF는 압축하거나 Git으로 올리세요. 일반 Git 저장소는 100 MiB 초과 파일을 차단합니다.

현재 ChatGPT Site와 GitHub Pages는 별도 배포입니다. 이후 한쪽에서 수정한 내용이 다른 쪽에 자동 동기화되지는 않습니다. GitHub로 이전한 후에는 해당 저장소를 기준으로 관리하세요.
