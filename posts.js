// 실제 발표 자료를 받은 뒤 아래 예시를 교체합니다.
// author: 논문 저자 이름, venue: 학회 / 저널명 (필요하면 연도 포함)
// 새 게시물은 README.md의 양식을 복사해 추가하세요.
const posts = [

  {
  id: "2026-11-24-V-JEPA-2",
  number: "08",
  example: false,
  topic: ["Video Self-Supervised Learning", "World Model", "Robot Planning"],
  title: "V-JEPA 2",
  subtitle: "Self-Supervised Video Models Enable Understanding, Prediction and Planning",
  cover: "V-JEPA 2",
  presenter: "정선영",
  date: "2026-11-24",
  paper: "https://arxiv.org/abs/2506.09985",
  author: "Mahmoud Assran, et al.",
  venue: "arXiv 2025",
  code: "https://github.com/facebookresearch/vjepa2",
  pdf: "slides/2026-11-24-V-JEPA-2.pdf",
  summary: "V-JEPA 2 learns predictive video representations from over one million hours of internet video to support motion understanding, action anticipation, and video question answering through LLM alignment, while action-conditioned post-training on less than 62 hours of robot interaction data enables V-JEPA 2-AC to perform zero-shot pick-and-place in new environments through image-goal planning without task-specific training or rewards.",
  discussion: `##### How Much Does Planning Depend on Human-Provided Subgoals?
- **Question:** How much does pick-and-place success depend on human-provided task decomposition?
- **Observation:** Figure 10 provides a sequence of goal images corresponding to grasping the object, moving it near the target location, and placing it down.
- The model selects the actions for each stage, while the intermediate goals and switching times are specified in advance.
- **Proposed Experiment:** Compare success rates with intermediate subgoal images versus only the final goal image, keeping the initial state, final goal, and action budget fixed to assess how much the planner benefits from externally provided task decomposition.

##### Does Replanning at Every Step Become a Bottleneck?
- **Question:** Could planning actions in chunks and executing several steps before observing again reduce replanning frequency while retaining closed-loop execution?
- **Authors' Discussion:** Appendix B.2 states that the experimental tasks were relatively greedy, making a planning horizon of H = 1 sufficient; longer horizons also worked to some extent but required more time per planning call.
- **Discussion:** As the horizon increases, could executing only the first action and replanning at the next step become a bottleneck in total execution time?
- **Proposed Experiment:** Let H denote the number of actions planned at once and K the number executed before replanning.
- Compare (H, K) = (1, 1) and (4, 1) to measure the cost of increasing the planning horizon.
- With H = 4, compare K = 1, 2, and 4 to evaluate how replanning frequency affects total execution time and task success.

#### QA 🙋

- **(11p) Energy minimization에서 energy는 무엇을 의미하는가?**  
  ➡️ 여기서 energy는 후보 action sequence를 실행했을 때 world model이 예측한 최종 representation과 goal image의 representation 사이의 L1 distance. 값이 작을수록 모델이 예측한 결과가 목표에 가깝다는 뜻이다. CEM은 여러 action sequence를 sampling하고, energy가 낮은 상위 후보들의 평균과 분산으로 sampling 분포를 반복적으로 업데이트해 목표에 가까워지는 action sequence를 찾는다.`
  },

{
  id: "2026-11-17-OLKTTS",
  number: "07", // 우리 스터디 회차 번호
  example: false, // 딱히 상관 없음
  topic: ["Omnimodal", "LLM", "Cross-Modal Alignment", "Reasoning"],
  title: "Omni-Modal LLMs Know More Than They Say",
  subtitle: "",
  cover: "OLKMTTS", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-11-17", // 발표 날짜
  paper: "https://arxiv.org/pdf/2610.16135",
  author: "Na Min An, et al.",
  venue: "ArXiv Preprint",
  code: "https://github.com/naver-ai/OmniLLM", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능
  pdf: "slides/2026-11-17-OLKTTS.pdf",
  summary: "This paper identifies the 'knows-but-cannot-say' phenomenon in omni-modal LLMs through Token-level Modality Alignment (TMA) analysis and proposes Omni-Catalyst, a perceive-then-infer strategy that supplements original multimodal inputs with self-generated textual descriptions to improve access to non-textual knowledge, multimodal reasoning, and balanced modality utilization.",
  discussion: `#### Discussion

1. **Generalizability Beyond Audio**
   - Does OmniCatalyst's advantage over Self-CoT extend to vision-centric tasks or conditions with degraded visual information?
   - Further evaluation could distinguish audio-specific gains from a general benefit of verbalizing underutilized modalities.

2. **Faithfulness of Self-Generated Descriptions**
   - Performance improvements demonstrate the utility of generated descriptions, while TMA and attention analyses suggest improved access to non-textual information during generation.
   - However, these results do not directly establish whether the descriptions faithfully reflect the original inputs.

---

#### Research Idea

1. **Combining Modality Description with Reasoning**
   - **RQ:** Can integrating OmniCatalyst with CoT and fidelity-aware RL improve multimodal reasoning?
   - **Method:** Compare direct answering, CoT, OmniCatalyst, and **Description → Reasoning → Answer**.
   - **Extension:** Compare outcome-only RL rewards with rewards that additionally encourage description fidelity.

2. **Verification and Correction of Generated Descriptions**
   - **RQ:** Do models over-rely on inaccurate descriptions, and can grounding-based verification reduce resulting errors?
   - **Method:** Extract task-relevant claims from generated descriptions, verify them against the original inputs, and correct unsupported claims before answering.
   - **Experiment:** Compare no description, self-generated descriptions, verified/corrected descriptions, and deliberately corrupted descriptions.
   - **Evaluation:** Description faithfulness, description-induced error rate, answer recovery rate, and computational cost.
   - **Hypothesis:** Textualization improves information accessibility but may propagate errors; grounding-based verification could improve answer reliability.

---

#### Q&A

1. **Why does masking high-TMA tokens degrade reasoning performance while perceptual knowledge remains relatively stable?**
   - TMA primarily reflects information accessibility during response generation, rather than the presence of perceptual knowledge itself. This supports the *knows-but-cannot-say* phenomenon.

2. **How does Self-CoT differ from OmniCatalyst? Are their intermediate outputs compared?**
   - Self-CoT provides an additional opportunity to reconsider an initial answer, whereas OmniCatalyst explicitly extracts non-textual information before answering.
   - The paper emphasizes performance comparisons and OmniCatalyst examples rather than a detailed qualitative comparison of their intermediate outputs.

3. **Do the visualization results follow the same OmniCatalyst process?**
   - The visualizations analyze modality-token alignment and attention within the OmniCatalyst framework, using TMA-based analysis to examine information accessibility during generation.
`
},
  
  {
  id: "2026-11-17-OpenDriveVLA",
  number: "07",
  example: false,
  topic: ["VLA", "Autonomous Driving"],
  title: "OpenDriveVLA",
  subtitle: "Towards End-to-end Autonomous Driving with Large Vision Language Action Model",
  cover: "OpenDriveVLA",
  presenter: "정선영",
  date: "2026-11-17",
  paper: "https://arxiv.org/abs/2503.23463",
  author: "Xingcheng Zhou, Xuyuan Han, Feng Yang, Yunpu Ma, Volker Tresp, Alois Knoll",
  venue: "AAAI 2026",
  code: "https://github.com/DriveVLA/OpenDriveVLA",
  pdf: "slides/2026-11-17-OpenDriveVLA.pdf",
  summary: "OpenDriveVLA integrates structured 2D and 3D visual representations, ego vehicle states, and language commands through hierarchical vision-language alignment and autoregressive agent-environment-ego interaction modeling to generate spatially grounded driving trajectories, achieving strong performance on nuScenes open-loop planning and driving question answering.",
  discussion: `##### Model Scaling and Performance
- **Question:** While the strong performance of the 0.5B model demonstrates the competitiveness of lightweight models, should the weaker performance of larger models also be interpreted positively?
- **Observation:** In Table III, the 0.5B model outperforms the 3B and 7B variants on several metrics, with no consistent improvement as model size increases.
- **Authors' Discussion:** The appendix suggests insufficient data scale and diversity, reliance on language priors, and optimization sensitivity as possible explanations.

##### Does Planning Actually Use Visual Information?
- **Question:** Despite the emphasis on 3D visual grounding, how much does trajectory planning actually use visual information?
- **Observation:** Table IV shows a relatively small performance decrease when visual input is removed, recalling the blind planning problem discussed in a previously reviewed paper.
- **Related Work:** Grounding Driving VLA via Inverse Kinematics (Park & Shim, 2026).
- **Finding:** The cited work reports that existing driving VLAs, including OpenDriveVLA, produce nearly unchanged trajectories even when a vehicle is synthetically inserted ahead.
- **Interpretation:** This suggests shortcut learning that relies on ego status and text commands rather than visual information.
- **Approach:** Learn future visual state prediction and generate trajectories with an inverse kinematics network that receives only the current and predicted future visual states to suppress shortcuts.

#### QA 🙋

- **(8p) Vision-text alignment에서 visual representation을 language 쪽 latent space에 정렬하면서 vision과 text 사이에 modality gap이 생기지는 않았을까?**  
  ➡️ Alignment 자체가 modality gap을 줄이기 위한 과정이다. Visual encoder와 LLM을 freeze하고 projector만 학습한 것도 visual token을 language domain으로 정렬하면서 기존 능력이 손실되는 것을 막기 위한 것으로 생각했다. 또한 trajectory 생성과 driving QA 응답을 수행하므로, text를 vision 쪽으로 가져오는 것보다 vision을 language 쪽으로 정렬하는 것이 task에 더 맞는다고 보았다.  
  **[추가 확인한 내용]** Alignment를 수행했다는 사실만으로 modality gap이 완전히 사라졌다고 할 수는 없다. Vision-to-language 정렬은 기존 LLM을 활용하기 위한 설계이며, 반대 방향보다 우수하다는 근거는 제시되지 않았다.

- **(9p) Training에서 semantic reasoning pattern을 내재화했다는 것을 어떻게 알 수 있는가? 다른 조건을 모두 통제하고 CoT와 instruction tuning만 조작변인으로 두어 비교했는지, 그 결과 비슷하거나 더 좋은 성능을 확인해서 내재화했다고 주장하는 것인지 궁금하다.**  
  ➡️ Driving QA dataset을 이용한 instruction tuning으로 high-level driving knowledge를 학습한 것을 semantic reasoning pattern의 내재화라고 표현한 것 같다.  
  **[추가 확인한 내용]** 해당 학습 단계인 Stage 2의 ablation study는 진행했지만, 내재화를 직접 검증하거나 다른 조건을 통제한 채 CoT와 비교한 실험은 아니었다. Appendix에서도 current limitation으로 explicit CoT의 부재가 복잡한 상황의 추론을 제한할 수 있음을 언급한다. 따라서 학습 단계의 효과와 내재화의 근거를 구분하고, explicit CoT 대비 효과를 검증할 필요가 있다고 생각한다.`
},
  
  {
  id: "2026-11-14-Geometric-Distillation",
  number: "06",
  example: false,
  topic: ["VLM", "3D Vision", "Knowledge Distillation"],
  title: "Geometric Distillation",
  subtitle: "3D-Aware Vision-Language Models Fine-Tuning with Geometric Distillation",
  cover: "Geometric Distillation",
  presenter: "정선영",
  date: "2026-11-14",
  paper: "https://arxiv.org/abs/2506.09883",
  author: "Seonho Lee, Jiho Choi, Inha Kang, Jiwook Kim, Junsung Park, Hyunjung Shim",
  venue: "EMNLP 2025 (Findings)",
  code: "https://github.com/kaist-cvml/geometric-distillation",
  pdf: "slides/2026-11-14-Geometric-Distillation.pdf",
  summary: "Geometric Distillation enhances pretrained VLMs' 3D spatial understanding through lightweight, annotation-free fine-tuning that transfers sparse correspondences, relative depth relations, and dense cost volumes from 3D foundation models, improving 3D perception and vision-language reasoning at lower computational cost than prior approaches while preserving the original architecture and compatibility with image-text inputs.",
  discussion: `##### Geometric Supervision from Feature Matching
- **Question:** Could a low-cost feature matcher provide geometric supervision in place of a 3D foundation model?
- **Idea:** Replace MASt3R or VGGT with a feature matcher as the source of sparse correspondences.
- **Validation:** Keep other training conditions fixed and compare supervision generation costs and downstream performance.
- **Challenge:** Since matching alone does not directly provide depth or metric scale, restrict this replacement to the sparse matching loss.

##### From Geometric Understanding to Action
- **Question:** Could geometric distillation also benefit spatially demanding manipulation tasks in VLAs?
- **Motivation:** This paper evaluates perception and visual question answering, but its effect on action execution remains untested.
- **Related Work — GLaD:** [GLaD](https://arxiv.org/abs/2512.09619) distills VGGT's geometric features into the LLM hidden states corresponding to visual tokens in a VLA.
- **Discussion:** GLaD cites this paper in its related work, but the distillation targets and loss designs differ, and no direct experimental comparison between the two approaches is provided.`
},
  
{
  id: "2026-11-14-OmniVinci",
  number: "06", // 우리 스터디 회차 번호
  example: false, // 딱히 상관 없음
  topic: ["Omnimodal", "LLM"],
  title: "OmniVinci",
  subtitle: "Enhancing Architecture and Data for Omni-Modal Understanding LLM",
  cover: "OmniVinci", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-11-14", // 발표 날짜
  paper: "https://arxiv.org/pdf/2510.15870v2",
  author: "Hanrong Ye, et al. (NVIDIA)",
  venue: "ICLR 2026",
  code: "https://github.com/NVlabs/OmniVinci", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능
  pdf: "slides/2026-11-14-OmniVinci.pdf",
  summary: "OmniVinci improves omni-modal understanding through contrastive vision–audio alignment with OmniAlignNet, temporal synchronization via Temporal Embedding Grouping and Constrained Rotary Time Embedding, and joint training on 24 million curated and synthesized conversations.",
  discussion: `#### Limitations

1. **Understanding-Centric Architecture**
   - Native output is text; speech relies on external TTS backends, without end-to-end any-to-any generation.

2. **Coarse-Grained Cross-Modal Alignment**
   - Clip-level alignment does not explicitly enforce object–sound or event-level correspondence.
   - TEG and CRTE encode temporal relationships, but fine-grained synchronization remains insufficiently validated.

3. **Uneven Performance and Limited Controlled Comparisons**
   - OmniVinci trails Qwen2.5-Omni on OmniBench (46.47 vs. 56.13), indicating room for improvement in image–audio understanding.
   - CRTE’s advantage over TMRoPE remains unestablished without a controlled comparison.

#### Research Ideas

1. **Fine-Grained Cross-Modal Alignment**
   - **RQ:** Is clip-level contrastive learning sufficient for fine-grained audiovisual correspondence?
   - Introduce segment/event-level contrastive objectives and object–sound grounding; evaluate audiovisual event localization and temporal grounding.

2. **Cross-Modal Interaction vs. Modality Bias**
   - **RQ:** Do performance gains reflect cross-modal interaction or reliance on a dominant modality?
   - Compare aligned inputs with single-modality inputs, mismatched audio–video pairs, and temporally shifted pairs; analyze accuracy changes and error patterns on tasks requiring both modalities.

3. **Generalization of Alignment Methods**
   - **RQ:** Do OmniVinci’s alignment methods generalize across architectures and tasks?
   - Compare CRTE and TMRoPE-based alternatives under matched training conditions; extend the existing incremental ablations with factorial tests of OmniAlignNet, TEG, and CRTE, alongside task-level OmniBench analysis.

#### Q&A

1. **Did vision degradation motivate omni-modal joint training?**
   - Yes. Appendix C.2.2 explicitly reports weaker visual understanding after audio training and identifies this as a motivation for subsequent joint training.

2. **Does the paper evaluate individual modality capabilities?**
   - Yes. Sections 4.2.2–4.2.4 report audio, video, and image evaluations. However, final-model benchmark results do not substitute for systematic checkpoint-by-checkpoint evaluation of forgetting and recovery.
`
},
  
{
  id: "2026-11-03-Qwen2.5-Omni",
  number: "05", // 우리 스터디 회차 번호
  example: false, // 딱히 상관 없음
  topic: ["Omnimodal", "LLM"],
  title: "Qwen2.5-Omni",
  subtitle: "Technical Report",
  cover: "Qwen2.5-Omni", // 갤러리형일때만 표시됨. 지금은 리스트형이라서 화면에 표시 X
  presenter: "이정연",
  date: "2026-11-03", // 발표 날짜
  paper: "https://arxiv.org/pdf/2503.20215",
  author: "Qwen Team",
  venue: "arXiv Preprint",
  code: "https://github.com/QwenLM/Qwen2.5-Omni", // 논문이 공개한 깃허브 등 코드 있다면 링크 첨부 가능
  pdf: "slides/2026-11-03-Qwen2.5-Omni.pdf",
  summary: "Qwen2.5-Omni integrates text, image, audio, and video understanding with concurrent streaming text and speech generation through a Thinker–Talker architecture, using TMRoPE to temporally align audio–video inputs and a dual-track autoregressive Talker conditioned on Thinker representations and text tokens to generate speech.",
  discussion: `#### Limitations and Future Directions

- **Limitation:** Output modalities are limited to text and speech.
- **Authors’ Future Work:** Extend generation to images, videos, and music.
- **Additional Idea:** Explore 3D generation and structured outputs, such as executable code, tables, and rendered charts.

#### Research Ideas

**1. Context-Aware Speech Generation**

- **RQ:** Do Thinker’s hidden representations help Talker produce contextually appropriate prosody and emotion?
- **Experiment:** Fix the response text while varying the audiovisual context, comparing Thinker–Talker with text-only TTS and a context-ablated variant.
- **Example:** “It’s okay” when comforting someone versus accepting a request.
- **Evaluation:** Human ratings of contextual appropriateness, emotion, and prosody, alongside speaking-rate analysis and word error rate.
- **Expected Insight:** Determine whether speech generation uses contextual information beyond the response text.

**2. Modality Selection under Conflicting or Degraded Inputs**

- **RQ:** Can the model prioritize task-relevant information when visual and auditory cues conflict or become unreliable?
- **Experiment:** Compare matched, conflicting, modality-ablated, and noise-corrupted inputs using paired questions.
- **Example:** A dog image with a cat’s meow: “Which animal is visible?” versus “Which animal is audible?”
- **Evaluation:** Accuracy by condition, performance changes after modality removal, and robustness across noise levels.
- **Expected Insight:** Identify modality biases and sensitivity to input reliability.

#### Discussion and Q&A

**1. Why does an omni-modal model generate only text and speech?**

Multimodal understanding does not automatically enable generation in every input modality. Qwen2.5-Omni focuses on multimodal understanding and simultaneous streaming text–speech responses; image, video, and music generation remain future directions. Comparisons with GPT models should specify the model version and distinguish native capabilities from external tools.

**2. Must all modalities use three-dimensional representations?**

No. TMRoPE uses three positional components—temporal, height, and width—not three-dimensional input embeddings. Text uses identical position IDs across these components, making its positional encoding equivalent to standard 1D RoPE. This is a design choice for representing spatial structure and audiovisual timing, rather than a universal requirement.

**3. How does this compare with AnyGPT and NExT-GPT?**

AnyGPT converts modalities into discrete tokens embedded in the LLM’s shared hidden space. NExT-GPT projects encoder features into LLM-compatible representations. These mechanisms differ from TMRoPE: embedding compatibility and positional encoding address separate problems.

**4. What are the key contributions and empirical results?**

Key contributions include Thinker–Talker, TMRoPE, and streaming input/output processing. In the reported OmniBench evaluation, Qwen2.5-Omni-7B achieved 56.13% average accuracy versus AnyGPT-7B’s 18.04%; this comparison concerns multimodal understanding.
`
},
  
{
  id: "2026-11-03-Reuse-Before-You-Retrieve",
  number: "05",
  example: false,
  topic: ["Robotics", "VLA", "Test-Time Augmentation"],
  title: "Reuse Before You Retrieve",
  subtitle: "Diagnosing Headroom and Complementarity for Test-Time Augmentation of Embodied Multimodal Policies",
  cover: "Reuse Before You Retrieve",
  presenter: "정선영",
  date: "2026-11-03",
  paper: "https://arxiv.org/abs/2608.17484",
  author: "Yuhwan Jeong, Kuk-Jin Yoon",
  venue: "ECCV Workshop 2026",
  code: "",
  pdf: "slides/2026-11-03-Reuse-Before-You-Retrieve.pdf",
  summary: "Reuse Before You Retrieve uses recoverable headroom and retrieval complementarity to distinguish when frozen VLA policies benefit from selecting existing stochastic behaviors or introducing external demonstration priors, showing that episode-level selection under retryable or parallel execution improves LIBERO success rates by up to 21 percentage points while retrieval benefits the policy with the largest measured action-prior gap and can provide further gains when combined with selection.",
  discussion: `##### Performance Degradation after Retrieval
- **Question:** Why does combining retrieval with selection perform worse than selection alone on the Goal suite?
- **Observation:** Success decreases from 97.6% with selection alone to 96.8% with retrieval and selection, a drop of 0.8 percentage points.
- **Discussion:** A high success rate limits the potential for further improvement but does not explain why performance decreases after combining the two interventions.
- **Analysis:** Compare cases where adding retrieval turns failure into success with cases where it turns success into failure under the same initial states.
- **Validation:** Repeat the evaluation across multiple seeds to determine whether the 0.8-percentage-point decrease is consistent.

##### From Retryable Execution to a Single Irreversible Attempt
- **Stated Limitation:** The method selects among N complete rollouts after executing them from the same initial state, requiring resets or parallel execution.
- **Question:** How can candidates be compared and selected when only one real execution attempt is available?
- **Discussion:** The current score relies on observation sequences collected during execution and therefore cannot be computed before execution.
- **Possible Direction:** Predict and evaluate candidate rollouts using a world model or simulator, then execute the selected actions in the real environment.

#### QA 🙋

- **의견 — Conditions for Test-Time Scaling:** Candidate set 안에 더 나은 outcome이 존재해야 하고, selection signal이 이를 식별할 수 있어야 한다는 조건은 치명적인 단점인 것 같다는 의견이 있었다. 이와 관련해 발표자료에서는 headroom과 oracle–selector gap을 분리하여 평가할 필요가 있다고 정리했다.`
},
  
{
  id: "2026-10-27-AnyGPT",
  number: "04",
  example: false,
  topic: ["Multimodal", "LLM", "Any-to-Any Generation"],
  title: "AnyGPT",
  subtitle: "Unified Multimodal LLM with Discrete Sequence Modeling",
  cover: "AnyGPT",
  presenter: "이정연",
  date: "2026-10-27",
  paper: "https://arxiv.org/abs/2402.12226",
  author: "Jun Zhan, et al.",
  venue: "ACL 2024",
  code: "https://junzhan2000.github.io/AnyGPT.github.io/",
  pdf: "slides/2026-10-27-AnyGPT.pdf",
  summary: "AnyGPT enables any-to-any understanding and generation across text, speech, images, and music by representing all modalities as discrete token sequences, training a unified autoregressive LLM via next-token prediction with text-centric multimodal alignment and synthetic interleaved instruction data, and decoding generated tokens back into their original modalities.",
  discussion: `#### Research Idea - Unified Multi-Turn Any-to-Any Benchmark
  
**Related Work**

- OmniBench (2025): Evaluates cross-modal understanding and reasoning across text, image, and audio inputs, without multimodal generation or multi-turn dialogue evaluation.
- UniM (2026): Any-to-any interleaved evaluation across 7 modalities, without explicit multi-turn dialogue evaluation.
- MME-Unify (2026): Unified evaluation of multimodal understanding and generation, without sustained multi-turn interaction.
- IMUG-Bench (2026): Joint understanding and generation in multi-turn dialogues, limited to image–text interactions.
- OmniDialog (2024): Multi-turn generalization across text, image, and audio inputs, primarily focusing on understanding.
- Modality Maturity Index (2026): Evaluates input/output modality combinations and appropriate output modality selection, primarily through single-turn prompts.

**Research Gap**

Existing benchmarks do not comprehensively evaluate **any-to-any multimodal understanding and generation together with context retention and appropriate response modality selection across multiple dialogue turns.**

**Proposed Direction**

Develop a **unified multi-turn any-to-any multimodal benchmark** evaluating:

1. Understanding & Generation: Accuracy and quality across diverse input/output modality combinations.
2. Context Consistency: Ability to maintain context across multiple turns and modality switches.
3. Modality Selection: Ability to select and generate appropriate output modalities based on conversational context.

#### Q&A

Q1. NExT-GPT도 projection으로 모달리티를 정렬하는데, discrete token으로 통일하는 것과 큰 차이가 있는가?

A1.
- NExT-GPT: Projection으로 표현 공간을 정렬하지만, 입력과 출력의 표현 방식이 달라 별도의 정렬 과정이 필요하다.
- AnyGPT: 모든 모달리티를 discrete token으로 표현하여 동일한 autoregressive framework에서 모델링한다.
⇒ 핵심 장점은 LLM의 기존 아키텍처와 next-token prediction objective를 그대로 활용해 통합 학습할 수 있다는 점이다. (△ quantization으로 인한 정보 손실이 발생할 수 있어 discrete token이 항상 우수한 것은 아닐 수 있다.)

Q2. AnyGPT는 모달리티별 복원 방식이 diffusion/decoding으로 다른데, 오히려 모든 모달리티의 생성에 diffusion을 사용하는 NExT-GPT가 더 통일된 방식 아닌가?

A2.
- NExT-GPT: Diffusion 기반 생성 모델을 활용하지만, 모달리티마다 서로 다른 모델과 출력 projection을 사용한다.
- AnyGPT: LLM이 모든 모달리티의 discrete token을 직접 예측하고, 최종 콘텐츠는 모달리티별 decoder로 복원한다.
⇒ AnyGPT의 통일성은 복원 방식이 아니라 LLM 내부의 unified sequence modeling에 있다.
`
},
  
{
  id: "2026-10-27-TUD",
  number: "04",
  example: false,
  topic: ["Robotics","VLA","Adaptive Inference"],
  title: "TUD",
  subtitle: "Triggering Generalist Reasoning via Predictive Uncertainty for Dual-System VLA",
  cover: "TUD",
  presenter: "정선영",
  date: "2026-10-27",
  paper: "https://arxiv.org/abs/2610.05025",
  author: "Hyemin Yang, Wooseong Jeong, Giwon Lee, Kuk-Jin Yoon",
  venue: "NeurIPS 2026",
  code: "",
  pdf: "slides/2026-10-27-TUD.pdf",
  summary: "TUD enables adaptive generalist invocation in dual-system VLA models by measuring the cross-step dispersion of action re-predictions under cached context, reusing existing model forwards without phase annotations or an auxiliary uncertainty model to improve the success–computation trade-off and reduce generalist calls by 75% in real-robot experiments relative to the strongest fixed-interval baseline while increasing success.",
  discussion: `##### Learnable Maximum Invocation Interval
- **Limitation:** A fixed maximum invocation interval limits the ability to account for situation-dependent rates of change when handling drift.
- **Motivation:** If predictions change gradually, could their deviation from the initial plan accumulate even when dispersion remains low?
- **Idea:** Learn a policy that adjusts the maximum invocation interval according to observation changes and prediction trends, shortening it when changes accumulate and extending it during stable periods.

##### Fixed Buffer Size and Re-Prediction Interval
- **Motivation:** Could fixing the buffer size at five and the re-prediction interval at two steps be as rigid as invoking the generalist at a static frequency?
- **Validation in Appendix C:** The slide presents an ablation table comparing success rates and call counts across buffer sizes, measurement intervals, decision intervals, and maximum invocation intervals.

#### QA 🙋

- 고정된 호출 간격 대신 Generalist를 적응적·유연하게 호출하는 기존 연구도 있지 않은가?  
  ➡️ 관련 연구로 OneTwoVLA가 있었지만, action phase boundary를 annotation한 뒤 활용하는 방식이었다. 이외에 직접 비교할 만한 관련 연구는 없었던 것 같다.

- Baseline은 어떤 기준으로 선정했는가? Generalist를 고정 주기로 호출하는 모델만 포함했는지, dual-system VLA가 아닌 방법도 포함했는지 궁금하다.  
  ➡️ 실험 분석은 제안 모델 구조를 평가하는 ablation에 중점을 두었으며, baseline은 성능이 좋은 VLA들을 중심으로 선정했다.`
},
  
{
  id: "2026-10-08-ReSplat",
  number: "03",
  example: false,
  topic: ["3D Gaussian Splatting","Novel View Synthesis","Image Restoration"],
  title: "ReSplat",
  subtitle: "Degradation-agnostic Feed-forward Gaussian Splatting via Self-guided Residual Diffusion",
  cover: "ReSplat",
  presenter: "정선영",
  date: "2026-10-08",
  paper: "https://openreview.net/forum?id=461VpgnLsi",
  author: "Youngho Yoon, Kuk-Jin Yoon",
  venue: "ICLR 2026 (Poster)",
  code: "https://github.com/yh-yoon/ReSplat",
  pdf: "slides/2026-10-08-ReSplat.pdf",
  summary: "ReSplat introduces a degradation-agnostic novel-view synthesis framework that jointly restores multi-view images and predicts a Gaussian scene representation, using 3D Gaussians generated during diffusion sampling as self-guidance to improve cross-view consistency and rendering quality under blur, low light, haze, rain, and snow.",
  discussion: `##### Insufficient Justification for Three-View Input
- The supplementary material includes two-view and four-view experiments, with NVS performance tending to improve as the number of views increases.
- NVS inference time is reported for three-view input, but not for four-view input.
- Reporting inference time across different view counts would better justify the choice of three-view input.

##### Missing Multi-View Image Restoration Results in Real-World Experiments
- Multi-view image restoration performance is not reported in the real-world experiments.
- The slide records a GPT-suggested explanation: quantitative input-view restoration evaluation requires clean ground truth that corresponds precisely to the degraded inputs, so ground-truth availability and alignment conditions may have affected the evaluation.`
},
  
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
  discussion: `##### Reference View Selection
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
  discussion: `##### Which Approach Will Take the Lead?
- VLAs trained on large-scale datasets or agent systems that accumulate experience during execution?
- A hybrid approach could let a VLA generate basic actions while a higher-level agent analyzes failures and compensates for them.

##### Extension Ideas
1. Develop a skill-library review mechanism that removes duplicates and evaluates skills after application to support removal and other maintenance decisions.
2. Explore a hybrid approach that fine-tunes a VLA using the skill library accumulated by an agent.
3. Include skill efficiency in the selection score so that more efficient actions can be chosen when success rates are equal.

##### Discussion: Skill Selection Criteria
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
