// 실제 발표 자료를 받은 뒤 아래 예시를 교체합니다.
// author: 논문 저자 이름, venue: 학회 / 저널명 (필요하면 연도 포함)
// 새 게시물은 README.md의 양식을 복사해 추가하세요.
const posts = [
{
  id: "2026-10-08-NExT-GPT",
  number: "03", // 우리 스터디 회차 번호
  example: false, // 딱히 상관 없음
  topic: ["Multimodal", "LLM", "Any-to-Any Generation"],
  title: "NExT-GPT",
  subtitle: "Any-to-Any Multimodal LLM",
  cover: "NExT-GPT", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-10-08", // 발표 날짜
  paper: "https://arxiv.org/abs/2309.05519",
  author: "Shengqiong Wu, et al.",
  venue: "ICML 2024 (Oral)",
  code: "", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능
  pdf: "slides/2026-10-08-NExT-GPT.pdf",
  summary: "NExT-GPT introduces an end-to-end any-to-any multimodal LLM that integrates pretrained multimodal encoders and diffusion decoders through lightweight input/output projection layers, leveraging modality-specific signal tokens and modality-switching instruction tuning (MosIT) to enable unified understanding and generation across text, image, audio, and video.",
  discussion: `#### Limitations

1. **Incomplete quantitative evaluation:** The evaluation does not systematically cover all possible input–output modality combinations.
2. **Limited consistency and robustness assessment:** Cross-modal output consistency and error propagation over extended multi-turn conversations remain insufficiently evaluated.
3. **Potential biases in synthetic instruction data:** The reliance on GPT-4-generated instructions in MosIT raises questions about dataset bias and generalization to unseen scenarios.
4. **Lack of system-level efficiency analysis:** Despite updating only about 1% of model parameters, end-to-end inference latency, memory usage, and computational costs are not comprehensively compared.

#### Future Directions

1. **Scalability to new modalities:** Investigate how much additional alignment training is required when introducing new modalities or replacing pretrained decoders.
2. **Model and data scaling:** Examine the independent effects of LLM capacity and instruction-tuning dataset size on multimodal understanding and generation.
3. **Retrieval-augmented generation:** Explore whether incorporating retrieval mechanisms improves factual accuracy and cross-modal consistency.
4. **Generalization of MosIT:** Evaluate whether modality-switching instruction tuning generalizes to unseen modality transitions and input–output combinations.
`
},

{
  id: "2026-09-22-VGGT",
  number: "02",
  example: false,
  topic: ["3D Reconstruction","Multi-view Geometry","Transformer"],
  title: "VGGT",
  subtitle: "Visual Geometry Grounded Transformer",
  cover: "VGGT",
  presenter: "정선영",
  date: "2026-09-22",
  paper: "https://arxiv.org/abs/2503.11651",
  author: "Jianyuan Wang, Minghao Chen, Nikita Karaev, Andrea Vedaldi, Christian Rupprecht, David Novotny",
  venue: "CVPR 2025 (Best Paper Award)",
  code: "https://github.com/facebookresearch/vggt",
  pdf: "slides/2026-09-22-VGGT.pdf",
  summary: "VGGT introduces a feed-forward neural network that jointly predicts camera parameters, depth maps, point maps, and point tracks from one to hundreds of images, enabling fast and accurate 3D reconstruction while providing transferable features for downstream non-rigid tracking and novel-view synthesis.",
  discussion: `### Idea & Discussion

#### Reference View Selection
- Both DUSt3R and VGGT use the first image's camera as the reference coordinate frame.
- Could reconstruction performance improve if another view were selected as the reference?
- Investigate this question empirically.`
},
  
{
  id: "2026-09-22-e3",
  number: "02",
  example: false,
  topic: ["LLM", "Reasoning", "Test-Time Compute"],
  title: "e3",
  subtitle: "Learning to Explore Enables Extrapolation of Test-Time Compute for LLMs",
  cover: "e3",
  presenter: "이정연",
  date: "2026-09-22",
  paper: "https://arxiv.org/abs/2506.09026",
  author: "Amrith Setlur, et al.",
  venue: "ICLR 2026 (Poster)",
  code: "",
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
  id: "2026-09-16-ASPIRE",
  number: "01",
  example: false,
  topic: ["Robotics","Code-as-Policy","Continual Learning"],
  title: "ASPIRE",
  subtitle: "Agentic /Skills Discovery for Robotics",
  cover: "ASPIRE",
  presenter: "정선영",
  date: "2026-09-16",
  paper: "https://arxiv.org/abs/2607.00272",
  author: "Runyu Lu, et al.",
  venue: "arXiv 2026",
  code: "https://github.com/NVlabs/ASPIRE",
  pdf: "slides/2026-09-16-ASPIRE.pdf",
  summary: "ASPIRE introduces a continual-learning robotic system that autonomously writes and refines code-as-policy control programs through trace-guided debugging and evolutionary search, accumulating validated repairs in a reusable skill library to improve task performance, enable zero-shot transfer to unseen long-horizon tasks, and reduce real-robot programming effort across embodiments.",
  discussion: `### Idea & Discussion

#### Which Approach Will Take the Lead?
- VLAs trained on large-scale datasets or agent systems that accumulate experience during execution?
- A hybrid approach could let a VLA generate basic actions while a higher-level agent analyzes failures and compensates for them.

#### Extension Ideas
1. Develop a skill-library review mechanism that removes duplicates and evaluates skills after application to support removal and other maintenance decisions.
2. Explore a hybrid approach that fine-tunes a VLA using the skill library accumulated by an agent.
3. Include skill efficiency in the selection score so that more efficient actions can be chosen when success rates are equal.

#### Discussion: Skill Selection Criteria
- The slide describes skill selection in terms of failure signals and choosing candidates with higher success rates during evolutionary search, but notes that a tie-breaking criterion is not defined.
- Incorporating efficiency into the score could help select a more efficient skill.
- Should efficiency matter only when success rates are tied? If success is already sufficiently high, should a marginal improvement justify selecting a less efficient skill?`
},
  
{
  id: "2026-09-16-CLEAR",
  number: "01",
  example: false,
  topic: ["NLP", "Retrieval", "Multilingual"],
  title: "CLEAR",
  subtitle: "Cross-Lingual Enhancement in Retrieval via Reverse-training",
  cover: "CLEAR",
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
