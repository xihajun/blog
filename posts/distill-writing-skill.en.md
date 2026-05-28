# How I "Distilled" a Writing Skill from yage.ai Articles

Last week I did something unusual: I fed every deep-tech article from yage.ai into Claude Opus 4.6.

Not to summarize the content. I asked one specific question: "Do these articles share any similar structural patterns?"

I've always known that yage's articles have a distinctive rhythm. Every piece manages to make complex technical topics accessible to non-specialists while keeping experts engaged. But I could never pinpoint where that feeling came from. Was it the analogies? The data? The narrative structure? Or some deeper pattern?

So I let AI help me take it apart.

## The Discovery: A Six-Act Skeleton

Opus's analysis was more granular than I expected. It identified a structural pattern shared across nearly every article:

Each article has a **core contradiction** as its backbone. Not "Technology A is cool, let me explain it," but rather "A and B have a conflict most people haven't noticed, and this conflict determines where things go for the next three years."

Around this contradiction, articles unfold in six acts:

1. **Hook**: A concrete scene, no jargon in the first three sentences
2. **Historical context**: Where did this problem come from?
3. **Contradiction revealed**: Data and cases that make you feel the tension
4. **Technical deep-dive**: Breaking down approaches, each with a non-technical analogy
5. **Reality check**: Academic papers vs. actual deployment
6. **Reader takeaway**: Back to the opening scene, with an actionable framework

The interesting part is the writing order. Articles *read* as a linear 1→6 flow, but the optimal *writing* order starts with 3 (the contradiction), then 4, 2, 5, 6, and finally 1 (the hook). You need to know the heart of the article before you can design the perfect opening.

## From Structure Analysis to Executable Skill

Knowing the structure is one thing. Being able to reproduce it is another.

I sent Opus a second prompt:

> Based on this analysis, I think we can distill a skill. Given a topic and some initial thoughts, the agent would find links, papers, and news materials, generate a framework first, then gather resources, analyze them section by section, and finally assemble the complete article. Every intermediate step gets saved.

The key phrase is "every intermediate step gets saved." I didn't want a black box — topic in, article out. I wanted a pipeline with visible intermediate artifacts, where each step can be reviewed, intervened on, and iterated.

The framework sketch is a sub-page. The materials library is a sub-page. Each section's draft is a sub-page. If the technical deep-dive in section four goes wrong, I can roll back just that section without starting over.

The third prompt asked for a complete, agent-executable skill specification:

> Can you abstract this into a writing skill template? Given a topic, it first designs a similar framework, then each phase has a resource acquisition and digestion process, ultimately producing a similar article.

The output is the complete skill below.

## What Actually Works

I've used this skill for several articles now. Some observations:

**The framework design phase is the most valuable.** Once you find the core contradiction, the entire article's direction is set. You don't drift, don't end up writing a feature list disguised as analysis.

**The materials phase takes the longest but pays off the most.** The resources the agent finds frequently change my initial assumptions. Several times I've discovered during this phase that my original thesis was wrong and needed to adjust the framework. That's a feature, not a bug.

**Section-by-section generation beats one-shot generation by a mile.** Each section has a self-check list (analogy? data? transition?), so quality control is distributed rather than concentrated at the end.

**The anti-AI-voice checklist is essential.** Without it, the output is instantly recognizable as AI-written. With it, at least you clear the basic "human feel" bar. Though honestly, this checklist itself keeps evolving because AI writing habits change every few months.

## What Doesn't Work

Hooks are the hardest part. The skill can help the agent produce structurally correct hooks, but truly great hooks require an intuition about reader psychology that current AI still lacks. I usually rewrite the first paragraph manually.

Analogy quality is another issue. The skill requires a non-technical analogy for every technical concept, and AI does provide them, but some are forced. Great analogies (like yage's "KV cache = partition walls between workstations") require deep understanding of both the technology and everyday life. I haven't found a good way to systematize this yet.

## The Complete Skill

Below is the full skill specification. You can hand it to any AI agent that supports multi-step execution (I use Notion AI custom agents). Give it a topic and your initial thoughts, and it will execute phase by phase.

```markdown
# Deep Technical Writing Skill (Distilled from yage.ai)

## Overview

A deep technical article writing skill distilled from the writing style of yage.ai.
Given a topic and some initial thoughts, the agent executes in phases:
Framework design → Resource gathering → Section-by-section generation → Integration.
Every intermediate step is saved as a sub-page for review and iteration.

---

## Phase 0: Input Collection

Collect the following from the user before starting:

- **Topic**: The core technology/phenomenon/event to discuss
- **Initial thoughts**: User's existing judgments or angles to explore (1-3 sentences)
- **Target audience**: Default: "technically literate but not necessarily domain experts"
- **Language**: Chinese (default) / English
- **Reference materials (optional)**: Known papers, news links, data sources

---

## Phase 1: Core Contradiction + Framework Design

**Goal**: Find the article's skeleton — a structural contradiction or tension.

### 1.1 Extract Core Contradiction

Every article needs an impossible triangle / paradox / overlooked tension.
Before writing, answer:

- What conflicts with what in this topic?
- What's the common intuition? Why is reality different?
- Where do academia and industry disagree?

### 1.2 Design Six-Act Framework

| Act | Function | Title Style | Length |
|-----|----------|-------------|--------|
| ① Hook | Concrete scene, no jargon | (No title, just opening) | 2-4 para |
| ② History | Where did the problem come from? | "A forgotten history" | 3-6 para |
| ③ Contradiction | Put the tension on the table | "Why the triangle can't be solved" | 4-8 para |
| ④ Technical | Break down approaches with analogies | "Four traditional approaches" | 8-15 para |
| ⑤ Reality check | Papers vs. deployment | "Beyond the papers" | 3-6 para |
| ⑥ Takeaway | Back to "what this means for you" | "How to choose: four questions" | 3-5 para |

### 1.3 Output

Save as sub-page `[Topic] - Step 1: Framework Sketch`

---

## Phase 2: Resource Gathering

**Goal**: Find supporting materials for each section.

For each framework section, gather:
- Hook scenes: real, specific, relatable cases
- Historical context: original papers, textbook references, surveys
- Core data: quantitative evidence supporting the contradiction
- Technical details: original papers or technical blogs
- Industry cases: real deployments, earnings reports, engineering blogs
- Opposing views: counter-evidence to avoid one-sided narrative

For each material, record: source URL, one-line summary, key data points,
framework position, credibility (primary data > expert analysis > reporting > forum posts).

Save as sub-page `[Topic] - Step 2: Materials Library`

---

## Phase 3: Section-by-Section Generation

**Goal**: Write each section individually, save immediately.

### Writing Rules

- **Hook**: No meta-narration. Throw the reader into a scene. No jargon for 3 sentences.
- **Technical explanations**: Every concept needs a non-technical analogy.
- **Data**: Every argument needs quantitative support. Numbers need context.
- **Rhythm**: Long section → short section. No more than 3 paragraphs without data.
- **Tone**: No "let's look at" or "we will discuss." Let facts speak. Allow sharp judgments.
- **Ending**: No "in conclusion." Return to the opening scene. End with a judgment or question.

### Writing Order

1. ③ Contradiction (the heart)
2. ④ Technical deep-dive
3. ② Historical context
4. ⑤ Reality check
5. ⑥ Reader takeaway
6. ① Hook (last, because now you know the full picture)

### Self-Check per Section

- Core analogy present?
- Quantitative support present?
- Natural transition from previous section?
- No meta-narration?

---

## Phase 4: Integration

**Goal**: Combine six sections, fix transitions, rhythm, and consistency.

### Checklist

- Narrative continuity: Can the reader finish without interruption?
- Analogy consistency: Do analogies extend or conflict?
- Data density: Evenly distributed?
- Length balance: Technical section ≤ 40% of total
- Subheadings: Should be judgments or questions, not noun phrases
- Opening/closing echo: Does the ending return to the opening?

### Final Format

- **Title**: A judgment or paradox, max 20 characters (Chinese) / 10 words (English)
- **Word count**: 3000-6000 words (Chinese) / 2000-4000 words (English)

---

## Anti-AI-Voice Checklist

- Minimize em-dashes, especially consecutive ones
- Remove "not A, but B" / "rather than... it's actually..." patterns
- Remove triple-negation escalation ("no X, no Y, not even Z")
- Avoid: "fundamentally," "paradigm," "in other words," "essentially"
- Vary sentence length deliberately. Allow occasional colloquialisms.
- Don't default to "thesis → three points → closing quote" structure
- Don't end with forced aphorisms
- Write process, not conclusions. Show the thinking, the hesitation.
- Give specific names, places, numbers, times — not abstract noun piles.
```

## Why I'm Publishing This

Two reasons.

First, this skill itself is a case study in "using AI to distill human capability." Yage wrote dozens of articles, each hand-crafted, but the structural patterns inside them can be extracted and reused. This isn't replacing human writing — it's turning accumulated tacit knowledge into explicit, transmittable craft.

Second, I want to see what others produce with this skill. Same structure but different contradictions, different materials, different perspectives should yield completely different articles. If you try it, let me know how it goes.

This skill is still iterating. Every new article reveals something to improve. The biggest areas right now are hook quality and analogy filtering. If you have ideas, feel free to open an issue on GitHub.
