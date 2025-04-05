require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API路由 - 生成春联
app.post('/api/generate-couplet', async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({ error: '请提供春联主题' });
    }
    
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(400).json({ error: '请提供OpenRouter API密钥' });
    }
    
    // 调用OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content: "你是一个专业的春联创作大师，精通对联的创作。请根据用户提供的主题，创作一副春联（上联、下联和横批）。春联要求平仄协调、字数相等、意境优美。"
          },
          {
            role: "user",
            content: `请根据"${theme}"这个主题，创作一副春联，包括上联、下联和横批。请直接输出春联内容，不需要其他解释。格式为：\n上联：xxx\n下联：xxx\n横批：xx`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    // 提取生成的春联内容
    const coupletText = response.data.choices[0].message.content;
    
    // 解析春联内容
    const upperMatch = coupletText.match(/上联：(.+)/i);
    const lowerMatch = coupletText.match(/下联：(.+)/i);
    const horizontalMatch = coupletText.match(/横批：(.+)/i);
    
    const result = {
      upper: upperMatch ? upperMatch[1].trim() : '',
      lower: lowerMatch ? lowerMatch[1].trim() : '',
      horizontal: horizontalMatch ? horizontalMatch[1].trim() : ''
    };
    
    res.json(result);
  } catch (error) {
    console.error('生成春联时出错:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '生成春联时出错', 
      details: error.response?.data?.error || error.message 
    });
  }
});

// 导出 app 供 Vercel 使用
module.exports = app;
