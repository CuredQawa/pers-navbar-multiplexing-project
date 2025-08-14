// ../js/load-nanbar.js

window.loadHeaderPromise = (async () => {
    try {
      const response = await fetch('navbar.html');
      if (!response.ok) throw new Error(`加载失败: ${response.status} ${response.statusText}`);
  
      const data = await response.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data.trim();
  
      // 获取所有顶级元素
      const children = Array.from(tempDiv.children);
  
      let navElement = null;
      let mobileSidebar = null;
  
      // 分类提取
      for (const child of children) {
        if (child.tagName.toLowerCase() === 'nav' && child.classList.contains('navbar')) {
          navElement = child;
        } else if (child.classList && child.classList.contains('mobile-sidebar')) {
          mobileSidebar = child;
        }
      }
  
      // 插入 nav（带淡入效果）
      if (navElement) {
        navElement.style.opacity = '0';
        navElement.style.transition = 'opacity 0.5s ease-in-out';
        document.body.prepend(navElement);
  
        // 触发淡入
        setTimeout(() => {
          navElement.style.opacity = '1';
        }, 100);
      } else {
        console.error('⚠️ navbar.html 中未找到 <nav class="navbar">');
      }
  
      // 插入 mobile-sidebar（可选：插入到 nav 之后）
      if (mobileSidebar) {
        // 插入到 nav 之后，或 body 开头
        if (navElement) {
          navElement.after(mobileSidebar);
        } else {
          document.body.prepend(mobileSidebar);
        }
      }
  
      // 更新年份
      const yearSpan = document.getElementById('current-year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
  
    } catch (err) {
      console.error('❌ 加载 navbar 出错:', err);
      throw err;
    }
  })();