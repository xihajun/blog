# 本地运行大模型完全指南

在自己的电脑上运行大语言模型，意味着隐私、离线使用和零 API 费用。这是一份实用的入门指南。

## 为什么要本地运行？

- **隐私**：数据完全不出本机
- **成本**：没有按 token 计费的 API 费用
- **离线**：不需要联网就能用
- **定制**：可以针对自己的场景微调
- **速度**：小模型没有网络延迟

## 硬件要求

| 模型大小 | 内存需求 | 显存需求 | 示例模型 |
|---------|---------|----------|----------|
| 1-3B | 4-8 GB | 4 GB | Phi-3, Qwen2 |
| 7-8B | 8-16 GB | 8 GB | Llama 3, Mistral |
| 13B | 16-32 GB | 12 GB | Llama 2 13B |
| 30-34B | 32-64 GB | 24 GB | CodeLlama 34B |
| 70B+ | 64+ GB | 48+ GB | Llama 3 70B |

## 工具推荐

### Ollama（新手首选）

最简单的上手方式：

```bash
# 安装
curl -fsSL https://ollama.com/install.sh | sh

# 运行模型
ollama run llama3.1

# 带提示词运行
ollama run llama3.1 "用简单的话解释量子计算"
```

Ollama 会自动处理模型下载、量化和 GPU 加速。

### llama.cpp

需要更多控制和性能优化时使用：

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j$(nproc)

# 用 GGUF 模型运行
./main -m models/llama-3.1-8b-Q4_K_M.gguf -p "你好世界" -n 128
```

### LM Studio

图形界面应用，方便发现、下载和运行模型。非常适合不熟悉命令行的用户。

## 量化

量化通过降低精度来减小模型大小和内存占用：

- **Q4_K_M**：质量和速度的平衡点（推荐）
- **Q5_K_M**：质量稍好，内存占用更多
- **Q8_0**：接近原始质量，大小约为 Q4 的 2 倍
- **F16**：全精度，最大尺寸

## API 集成

大多数本地工具都提供 OpenAI 兼容的 API：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",  # Ollama
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="llama3.1",
    messages=[{"role": "user", "content": "你好！"}]
)
print(response.choices[0].message.content)
```

## 实用建议

1. 从小模型（7-8B）开始，逐步升级
2. 使用量化模型（Q4_K_M）获得最佳速度/质量比
3. 尽可能启用 GPU 加载
4. 用 `nvidia-smi` 或 `htop` 监控内存/显存使用
5. 不同任务用不同模型——代码模型写代码，聊天模型对话
