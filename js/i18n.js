var I18N = {
  zh: {
    name: 'Junfan Huang',
    bio: '科技博客 · 双语写作',
    blog: '博客',
    tools: '工具',
    projects: '项目',
    about: '关于',
    ai: 'AI 专栏',
    recent: '最新文章',
    back: '← 返回列表',
    coming: '内容即将上线...',
    search: '搜索文章...',
    searchBtn: '搜索',
    noResults: '没有找到匹配的文章',
    allTags: '全部',
    aiColumnTitle: 'AI 专栏',
    aiColumnDesc: '关于人工智能、大模型、提示工程等前沿技术的深度文章。',
    blogColumnTitle: '手写博客',
    blogColumnDesc: '亲手撰写的原创文章，关于技术、生活和思考。'
  },
  en: {
    name: 'Junfan Huang',
    bio: 'Tech Blog · Bilingual Writing',
    blog: 'Blog',
    tools: 'Tools',
    projects: 'Projects',
    about: 'About',
    ai: 'AI Column',
    recent: 'Recent Posts',
    back: '← Back to list',
    coming: 'Coming soon...',
    search: 'Search posts...',
    searchBtn: 'Search',
    noResults: 'No matching posts found',
    allTags: 'All',
    aiColumnTitle: 'AI Column',
    aiColumnDesc: 'In-depth articles on artificial intelligence, LLMs, prompt engineering, and more.',
    blogColumnTitle: 'Hand-Written Blog',
    blogColumnDesc: 'Original articles written by hand, on tech, life, and reflections.'
  }
};

var currentLang = navigator.language.startsWith('zh') ? 'zh' : 'en';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en[key]) || key;
}

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  applyI18n();
  renderSidebarPosts();
  renderCurrentPage();
}

function applyI18n() {
  var lang = I18N[currentLang];
  var el;
  el = document.querySelector('.sidebar-name'); if (el) el.textContent = lang.name;
  el = document.querySelector('.sidebar-bio'); if (el) el.textContent = lang.bio;
  document.querySelectorAll('[data-i18n]').forEach(function(e) {
    var key = e.getAttribute('data-i18n');
    if (lang[key]) e.textContent = lang[key];
  });
  el = document.getElementById('lang-toggle');
  if (el) el.textContent = currentLang === 'zh' ? 'EN' : '中文';
}
