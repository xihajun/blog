# Prompt Engineering: A Practical Guide

Prompt engineering is the practice of designing and refining inputs to large language models (LLMs) to get better, more reliable outputs. It's less about magic phrases and more about clear communication.

## Why Prompts Matter

LLMs are trained on massive datasets but lack context about your specific needs. A well-crafted prompt bridges that gap by providing:

- **Context**: Background information the model needs
- **Instructions**: What you want it to do
- **Format**: How you want the output structured
- **Constraints**: What to avoid or include

## Core Techniques

### 1. Be Specific

Bad: "Write about dogs"

Good: "Write a 200-word overview of Golden Retrievers as family pets, covering temperament, exercise needs, and grooming requirements."

### 2. Use Examples (Few-Shot)

Provide examples of input-output pairs:

```
Convert these to bullet points:

Input: "The project is due Friday. We need 3 developers. Budget is $50k."
Output:
- Deadline: Friday
- Team size: 3 developers
- Budget: $50,000

Now convert: "Meeting at 2pm in Room 301. Bring your laptop. Optional: design mockups."
```

### 3. Chain of Thought

Ask the model to think step by step:

```
Solve this problem step by step:
If a store has a 20% off sale, and you have a 10% coupon applied after the sale price, what do you pay for a $100 item?
```

### 4. Role Assignment

```
You are a senior Python developer reviewing code for a junior developer. Focus on readability, error handling, and Python best practices.
```

## Common Pitfalls

1. **Too vague**: Not providing enough context or constraints
2. **Too complex**: Trying to do too much in one prompt
3. **No format spec**: Not specifying how you want the output
4. **Ignoring iteration**: Expecting perfection on the first try

## Useful Patterns

| Pattern | When to Use |
|---------|-------------|
| Few-shot | Consistent formatting needed |
| Chain-of-thought | Complex reasoning tasks |
| Role-based | Domain-specific expertise |
| Template | Repeated tasks with variables |

## Further Reading

- OpenAI's [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- Anthropic's [Prompt Design Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- Google's [Prompting Strategies](https://ai.google.dev/docs/prompt_best_practices)
