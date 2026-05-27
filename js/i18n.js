var I18N = {
  zh: {
    name: 'Junfan Huang',
    bio: '\u4e00\u4e2a\u4e0d\u90a3\u4e48\u65e0\u804a\u7684\u7814\u7a76\u8005\uff0c\u559c\u6b22\u5199\u4ee3\u7801\u548c\u559d\u53ef\u4e50\u3002',
    nav_research: '\u7814\u7a76',
    nav_teaching: '\u6559\u5b66',
    nav_tools: '\u5de5\u5177 \u25be',
    nav_projects: '\u9879\u76ee',
    nav_blog: '\u535a\u5ba2',
    footer: '\u7528 \u2764\ufe0f \u6784\u5efa',
    coming: '\u5373\u5c06\u5230\u6765',
    read_more: '\u9605\u8bfb\u5168\u6587',
    back: '\u2190 \u8fd4\u56de\u5217\u8868'
  },
  en: {
    name: 'Junfan Huang',
    bio: 'A not-so-boring Researcher who like coding and Coca-Cola.',
    nav_research: 'Research',
    nav_teaching: 'Teaching',
    nav_tools: 'Tools \u25be',
    nav_projects: 'Projects',
    nav_blog: 'Blog',
    footer: 'Built with \u2764\ufe0f',
    coming: 'Coming',
    read_more: 'Read more',
    back: '\u2190 Back to list'
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