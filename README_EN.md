# AI Couplet Generator

[Chinese Version](README.md) | [English Version](README_EN.md)

This is an AI couplet generator based on OpenRouter API, which can automatically generate traditional couplets (upper line, lower line and horizontal scroll) according to user input themes.

## Features

- Generate customized couplets based on user input themes
- Beautiful Chinese-style interface design
- Responsive layout, supports mobile devices
- Supports one-click copy of generated couplets

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- API: OpenRouter API (using deepseek model)

## Installation & Usage

### Prerequisites

- Node.js (v14.0.0 or higher)

### Installation Steps

1. Clone or download this project

2. Install dependencies
   ```
   npm install
   ```

3. Start the server
   ```
   npm start
   ```
   Or use development mode (auto-restart):
   ```
   npm run dev
   ```

4. Open browser and visit `http://localhost:3000`

## How to Use

1. Enter your OpenRouter API Key at the top of the page and click "Save API Key" button
2. Enter the couplet theme in the input box (e.g.: New Year, Fortune, Spring, etc.)
3. Click "Generate Couplet" button
4. Wait for AI to generate results
5. View the generated couplet (upper line, lower line and horizontal scroll)
6. You can click "Copy" button to copy the couplet content, or click "Regenerate" button to create new couplets

## Get OpenRouter API Key

1. Visit [OpenRouter website](https://openrouter.ai/)
2. Register and create an API key
3. Enter your API Key in the input box at the top of the application page and click "Save API Key" button
4. API Key will be saved in browser local storage, no need to configure .env file