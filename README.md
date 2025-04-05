# AI春联生成器

[English Version](README_EN.md) | [中文版](README.md)


这是一个基于OpenRouter API的AI春联生成器，可以根据用户输入的主题自动生成传统春联（上联、下联和横批）。

## 功能特点

- 根据用户输入的主题生成定制春联
- 美观的中国风界面设计
- 响应式布局，支持移动设备
- 支持一键复制生成的春联

## 技术栈

- 前端：HTML, CSS, JavaScript
- 后端：Node.js, Express
- API：OpenRouter API (使用deepseek模型)

## 安装与使用

### 前提条件

- Node.js (v14.0.0或更高版本)

### 安装步骤

1. 克隆或下载本项目

2. 安装依赖
   ```
   npm install
   ```

3. 启动服务器
   ```
   npm start
   ```
   或者使用开发模式（自动重启）：
   ```
   npm run dev
   ```

4. 打开浏览器访问 `http://localhost:3000`

## 使用方法

1. 在页面顶部输入您的OpenRouter API Key并点击"保存API Key"按钮
2. 在输入框中输入春联主题（如：新年、福、春天等）
3. 点击"生成春联"按钮
4. 等待AI生成结果
5. 查看生成的春联（上联、下联和横批）
6. 可以点击"复制"按钮复制春联内容，或点击"重新生成"按钮创建新的春联

## 获取OpenRouter API密钥

1. 访问[OpenRouter官网](https://openrouter.ai/)
2. 注册并创建一个API密钥
3. 在应用页面顶部输入框中输入您的API Key并点击"保存API Key"按钮
4. API Key将保存在浏览器本地存储中，无需配置.env文件