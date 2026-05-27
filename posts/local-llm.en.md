# Running LLMs Locally: A Complete Guide

Running large language models on your own hardware gives you privacy, offline access, and zero API costs. Here's how to get started.

## Why Run Locally?

- **Privacy**: Your data never leaves your machine
- **Cost**: No per-token API fees
- **Offline**: Works without internet
- **Customization**: Fine-tune for your use case
- **Speed**: No network latency for smaller models

## Hardware Requirements

| Model Size | RAM Needed | GPU VRAM | Example Models |
|-----------|-----------|----------|----------------|
| 1-3B | 4-8 GB | 4 GB | Phi-3, Qwen2 |
| 7-8B | 8-16 GB | 8 GB | Llama 3, Mistral |
| 13B | 16-32 GB | 12 GB | Llama 2 13B |
| 30-34B | 32-64 GB | 24 GB | CodeLlama 34B |
| 70B+ | 64+ GB | 48+ GB | Llama 3 70B |

## Tools

### Ollama (Recommended for Beginners)

The easiest way to get started:

```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Run a model
ollama run llama3.1

# Run with a specific prompt
ollama run llama3.1 "Explain quantum computing in simple terms"
```

Ollama automatically handles model downloading, quantization, and GPU acceleration.

### llama.cpp

For more control and performance:

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j$(nproc)

# Run with a GGUF model
./main -m models/llama-3.1-8b-Q4_K_M.gguf -p "Hello, world" -n 128
```

### LM Studio

A GUI application that makes it easy to discover, download, and run models. Great for non-technical users.

## Quantization

Quantization reduces model size and memory usage by using lower precision:

- **Q4_K_M**: Good balance of quality and speed (recommended)
- **Q5_K_M**: Slightly better quality, more memory
- **Q8_0**: Near-original quality, ~2x size of Q4
- **F16**: Full precision, largest size

## API Integration

Most local tools expose an OpenAI-compatible API:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",  # Ollama
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="llama3.1",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

## Tips

1. Start with smaller models (7-8B) and scale up
2. Use quantized models (Q4_K_M) for best speed/quality ratio
3. Enable GPU offloading when possible
4. Monitor RAM/VRAM usage with `nvidia-smi` or `htop`
5. Try different models for different tasks — coding models for code, chat models for conversation
