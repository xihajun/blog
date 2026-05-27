var I18N = {
  zh: {
    name: 'Junfan Huang',
    bio: '一个不那么无聊的研究者，喜欢写代码和喝可乐。',
    nav_research: '研究',
    nav_teaching: '教学',
    nav_tools: '工具 ▾',
    nav_projects: '项目',
    nav_blog: '博客',
    footer: '用 ❤️ 构建',
    coming: '即将到来',
    read_more: '阅读全文',
    back: '← 返回列表'
  },
  en: {
    name: 'Junfan Huang',
    bio: 'A not-so-boring Researcher who like coding and Coca-Cola.',
    nav_research: 'Research',
    nav_teaching: 'Teaching',
    nav_tools: 'Tools ▾',
    nav_projects: 'Projects',
    nav_blog: 'Blog',
    footer: 'Built with ❤️',
    coming: 'Coming',
    read_more: 'Read more',
    back: '← Back to list'
  }
};
var currentLang = localStorage.getItem('blog-lang') || 'zh';
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (I18N[currentLang][key]) el.textContent = I18N[currentLang][key];
  });
  document.documentElement.lang = currentLang;
}
function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('blog-lang', currentLang);
  applyI18n();
  if (typeof renderCurrentPage === 'function') renderCurrentPage();
  if (typeof renderSidebarPosts === 'function') renderSidebarPosts();
}