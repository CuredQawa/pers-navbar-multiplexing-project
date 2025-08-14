// navbar.js

// 等待 navbar 加载完成后再执行初始化
window.loadHeaderPromise
  .then(() => {
    // 此时 navbar.html 已插入 DOM
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const panel = document.getElementById('dropdownPanel');
    const slider = panel?.querySelector('.dropdown-slider');
    const items = document.querySelectorAll('.nav-item[data-dropdown]');

    if (!navbar || !hamburger || !mobileSidebar || !panel || !slider) {
      console.warn('⚠️ 导航组件未找到，可能 DOM 未正确加载');
      return;
    }

    const pages = ['products', 'solutions', 'resources'];
    const pageWidth = 400;
    let timeout;

    // ======== 汉堡菜单：右侧滑入 ========
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      mobileSidebar.classList.toggle('active');
    });

    // 点击遮罩关闭
    document.addEventListener('click', (e) => {
      if (!mobileSidebar.contains(e.target) && !hamburger.contains(e.target)) {
        mobileSidebar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });

    // ======== 移动端下拉切换 ========
    document.querySelectorAll('[data-mobile-dropdown]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.mobileDropdown;
        const submenu = document.querySelector(`[data-submenu="${key}"]`);

        // 关闭其他菜单
        document.querySelectorAll('.mobile-sidebar-submenu').forEach((el) => {
          el.classList.remove('active');
        });
        document.querySelectorAll('.mobile-sidebar-item span').forEach((el) => {
          el.textContent = '▼';
        });

        if (!submenu.classList.contains('active')) {
          submenu.classList.add('active');
          btn.querySelector('span').textContent = '▲';
        }
      });
    });

    // ======== 桌面端悬停下拉 ========
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          const targetKey = item.dataset.target;
          const index = pages.indexOf(targetKey);
          if (index === -1) return;

          panel.classList.add('active');
          slider.style.transform = `translateX(${-index * pageWidth}px)`;
          items.forEach((i) => i.classList.remove('active'));
          item.classList.add('active');
        }, 150);
      });
    });

    navbar.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 768) return;
      timeout = setTimeout(() => {
        panel.classList.remove('active');
        items.forEach((i) => i.classList.remove('active'));
      }, 100);
    });

    panel.addEventListener('mouseenter', () => clearTimeout(timeout));
    panel.addEventListener('mouseleave', () => {
      panel.classList.remove('active');
      items.forEach((i) => i.classList.remove('active'));
    });
  })
  .catch((err) => {
    console.error('❌ 初始化导航失败:', err);
  });