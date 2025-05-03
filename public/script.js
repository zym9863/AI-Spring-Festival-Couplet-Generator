// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 获取DOM元素
  const apiKeyInput = document.getElementById('api-key-input');
  const saveApiKeyBtn = document.getElementById('save-api-key-btn');
  const themeInput = document.getElementById('theme-input');
  const generateBtn = document.getElementById('generate-btn');
  const loadingEl = document.getElementById('loading');
  const resultSection = document.getElementById('result-section');
  const upperEl = document.getElementById('upper');
  const lowerEl = document.getElementById('lower');
  const horizontalEl = document.getElementById('horizontal');
  const errorMessageEl = document.getElementById('error-message');
  const copyBtn = document.getElementById('copy-btn');
  const newBtn = document.getElementById('new-btn');

  // 从localStorage加载API Key
  const savedApiKey = localStorage.getItem('openRouterApiKey');
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
  }

  // 当前春联数据
  let currentCouplet = {
    upper: '',
    lower: '',
    horizontal: ''
  };

  // 生成春联
  async function generateCouplet(theme) {
    try {
      // 显示加载动画，隐藏结果和错误信息
      loadingEl.style.display = 'block';
      resultSection.style.display = 'none';
      errorMessageEl.style.display = 'none';

      // 发送请求到后端API
      // 获取API Key
      const apiKey = localStorage.getItem('openRouterApiKey');
      if (!apiKey) {
        throw new Error('请先设置OpenRouter API Key');
      }

      const response = await fetch('/api/generate-couplet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey
        },
        body: JSON.stringify({ theme })
      });

      // 检查响应状态
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成春联失败');
      }

      // 解析响应数据
      const data = await response.json();

      // 保存当前春联数据
      currentCouplet = {
        upper: data.upper,
        lower: data.lower,
        horizontal: data.horizontal
      };

      // 更新UI显示春联
      updateCoupletDisplay();

      // 隐藏加载动画，显示结果
      loadingEl.style.display = 'none';
      resultSection.style.display = 'block';
    } catch (error) {
      // 处理错误
      console.error('生成春联出错:', error);
      loadingEl.style.display = 'none';
      errorMessageEl.textContent = error.message || '生成春联时发生错误，请稍后再试';
      errorMessageEl.style.display = 'block';
    }
  }

  // 更新春联显示
  function updateCoupletDisplay() {
    upperEl.textContent = currentCouplet.upper;
    lowerEl.textContent = currentCouplet.lower;
    horizontalEl.textContent = currentCouplet.horizontal;
  }

  // 复制春联内容
  function copyCoupletText() {
    const coupletText = `横批：${currentCouplet.horizontal}\n上联：${currentCouplet.upper}\n下联：${currentCouplet.lower}`;

    navigator.clipboard.writeText(coupletText)
      .then(() => {
        // 显示复制成功提示
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';

        // 2秒后恢复原始文本
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
      });
  }

  // 事件监听器 - 生成按钮点击
  generateBtn.addEventListener('click', () => {
    const theme = themeInput.value.trim();
    if (!theme) {
      errorMessageEl.textContent = '请输入春联主题';
      errorMessageEl.style.display = 'block';
      return;
    }

    generateCouplet(theme);
  });

  // 事件监听器 - 输入框回车
  themeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateBtn.click();
    }
  });

  // 事件监听器 - 复制按钮
  copyBtn.addEventListener('click', copyCoupletText);

  // 事件监听器 - 重新生成按钮
  newBtn.addEventListener('click', () => {
    themeInput.value = '';
    resultSection.style.display = 'none';
    themeInput.focus();
  });

  // 事件监听器 - 保存API Key按钮
  saveApiKeyBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      errorMessageEl.textContent = '请输入OpenRouter API Key';
      errorMessageEl.style.display = 'block';
      return;
    }

    // 保存API Key到localStorage
    localStorage.setItem('openRouterApiKey', apiKey);

    // 显示保存成功提示
    const originalText = saveApiKeyBtn.textContent;
    saveApiKeyBtn.textContent = '已保存';
    setTimeout(() => {
      saveApiKeyBtn.textContent = originalText;
    }, 2000);
  });
});