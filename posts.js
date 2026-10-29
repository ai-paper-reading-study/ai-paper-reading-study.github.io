// 실제 발표 자료를 받은 뒤 아래 예시를 교체합니다.
// author: 논문 저자 이름, venue: 학회 / 저널명 (필요하면 연도 포함)
// 새 게시물은 README.md의 양식을 복사해 추가하세요.
const posts = [
{
  id: "2026-09-22-e3",
  number: "02", // 우리 스터디 회차 번호
  example: false, // 딱히 상관 없음
  topic: ["LLM", "Reasoning", "Test-Time Compute"],
  title: "e3",
  subtitle: "Learning to Explore Enables Extrapolation of Test-Time Compute for LLMs",
  cover: e3", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-09-22", // 발표 날짜
  paper: "https://arxiv.org/abs/2506.09026",
  author: "Amrith Setlur, et al.",
  venue: "ICLR 2026 (Poster)",
  code: "", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능
  pdf: "slides/2026-09-22-e3.pdf",
  summary: "e³ enables LLMs to extrapolate reasoning performance beyond their training token budgets by promoting in-context exploration through chaining asymmetric capabilities (e.g., verification and generation), leveraging negative policy gradients from failed reasoning traces, and coupling problem difficulty with training token budgets during reinforcement learning.",
  discussion: `#### Limitations: Causal Mechanisms

- **Confounded VG gap:** Mult-V's verification-rich SFT may also alter arithmetic ability, response length, and entropy, making it difficult to isolate the effect of verification.
- **Surface-level verification metrics:** Verification counts do not necessarily reflect genuine error detection or correction and may increase simply with response length.
- **GRPOMask confounds:** Masking negative gradients also changes optimization dynamics, limiting causal attribution to learning from failed traces.

#### Future Research Directions

- **Matched asymmetry intervention:** Isolate verification effects using length- and style-matched reasoning traces.
- **Process-aware rewards:** Reward meaningful error detection, correction, and non-repetition.
- **Adaptive token allocation:** Extend reasoning only when additional attempts are expected to improve accuracy.
- **Beyond verification-generation:** Investigate other capability asymmetries, such as retrieval-generation and planning-execution.

**Key Research Question:** Which asymmetries enable genuinely new solution paths rather than merely longer reformulations?
`
},
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
  discussion: `Future Research Directions

#### 1. English-Free Cross-Lingual Retrieval Evaluation

Evaluate CLEAR on **non-English query–passage pairs**.

- Construct a language-pair evaluation matrix.
- Prevent translation leakage through document-level splits.

#### 2. Stronger Retrievers and Downstream RAG Evaluation

Compare **Base, InfoNCE, and CLEAR** retrievers.
`
}
];
