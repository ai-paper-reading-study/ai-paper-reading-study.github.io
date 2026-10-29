// 실제 발표 자료를 받은 뒤 아래 예시를 교체합니다.
// author: 논문 저자 이름, venue: 학회 / 저널명 (필요하면 연도 포함)
// 새 게시물은 README.md의 양식을 복사해 추가하세요.
const posts = [
{
  id: "2026-09-16-CLEAR",
  number: "01", // 우리 스터디 회차 번호
  example: false,
  topic: ["NLP", "Retrieval", "Multilingual"],
  title: "CLEAR",
  subtitle: "Cross-Lingual Enhancement in Retrieval via Reverse-training",
  cover: "CLEAR", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-09-16",
  paper: "https://arxiv.org/abs/2604.05821",
  author: "Seungyoon Lee, et al.",
  venue: "ACL 2026 (main)",
  code: "",
  pdf: "slides/2026-09-16-CLEAR.pdf",
  summary: "CLEAR introduces a reverse-training contrastive loss that uses English passages as alignment bridges to strengthen cross-lingual representations, improving multilingual retrieval performance while preserving English retrieval quality.",
  discussion: `### Future Research Directions

#### 1. English-Free Cross-Lingual Retrieval Evaluation

Evaluate CLEAR on **non-English query–passage pairs**.

- Construct a language-pair evaluation matrix.
- Prevent translation leakage through document-level splits.

#### 2. Stronger Retrievers and Downstream RAG Evaluation

Compare **Base, InfoNCE, and CLEAR** retrievers.

[Read the paper](https://arxiv.org/abs/2604.05821)
`
},
 {example:true,id:'llm-template',topic:'LLM',title:'언어 모델의 아이디어를 깊이 읽기',subtitle:'문제 정의부터 제안 방법, 실험의 근거까지 차근차근.',cover:'Inside<br>the language.',paper:'',author:'',venue:'',presenter:'발표자 B',number:'02'},
 {example:true,id:'vision-template',topic:'Vision',title:'시각 지능의 다음 질문 찾기',subtitle:'성능 수치 너머의 한계와 후속 연구 아이디어를 기록합니다.',cover:'A different<br>perspective.',paper:'',author:'',venue:'',presenter:'발표자 A',number:'03'}
];
