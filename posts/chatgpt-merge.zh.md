# 让 ChatGPT 帮你合并代码

跨分支合并代码可能很繁琐。以下是 ChatGPT 如何帮助你。

## 问题

当你在多个分支上工作时, 合并冲突不可避免。手动解决冲突既耗时又容易出错。

## 解决方案

你可以把冲突标记粘贴到 ChatGPT 中, 让它智能地解决冲突。

```
<<<<<<< HEAD
function getData() {
  return fetch('/api/v2/data');
}
=======
function getData() {
  return fetch('/api/v1/data').then(r => r.json());
}
>>>>>>> feature-branch
```

ChatGPT 能理解两个版本的意图, 生成合并后的结果。

## 小贴士

- 提交前务必审查 AI 的建议
- 对于简单的逻辑冲突效果最好
- 复杂的架构冲突仍然需要人类判断
