var siteConfig = null;
var postsIndex = [];
async function loadConfig() {
  try {
    var res = await fetch('config.json');
    siteConfig = await res.json();
    if (siteConfig.name) { I18N.zh.name = siteConfig.name_zh || siteConfig.name; I18N.en.name = siteConfig.name; }
    if (siteConfig.bio_zh) I18N.zh.bio = siteConfig.bio_zh;
    if (siteConfig.bio_en) I18N.en.bio = siteConfig.bio_en;
    if (siteConfig.avatar) document.querySelector('.avatar').src = siteConfig.avatar;
    if (siteConfig.social) {
      var icons = document.querySelectorAll('.icon-btn');
      siteConfig.social.forEach(function(s, i) { if (icons[i]) icons[i].href = s.url; });
    }
  } catch(e) { console.log('No config.json found, using defaults.'); }
}
async function loadPostsIndex() {
  try { var res = await fetch('posts/index.json'); postsIndex = await res.json(); } catch(e) { postsIndex = []; }
}
function renderBlogList(container) {
  var lang = currentLang;
  var posts = postsIndex.filter(function(p) { return !p.lang || p.lang === lang || p.lang === 'both'; });
  var html = '<div class="blog-list">';
  if (posts.length === 0) html += '<p style="color:#aaa;text-align:center;padding:40px 0;">No posts yet.</p>';
  posts.forEach(function(p) {
    var title = lang === 'zh' ? (p.title_zh || p.title) : p.title;
    var excerpt = lang === 'zh' ? (p.excerpt_zh || p.excerpt || '') : (p.excerpt || '');
    html += '<div class="blog-item"><div class="blog-meta">' + (p.category||'') + ' &middot; ' + (p.date||'') + '</div><h3 onclick="navigate(\'blog\',\'' + p.slug + '\')">' + title + '</h3><p class="blog-excerpt">' + excerpt + '</p></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}
async function renderPost(slug, container) {
  var post = postsIndex.find(function(p) { return p.slug === slug; });
  if (!post) { container.innerHTML = '<p>Post not found.</p>'; return; }
  var lang = currentLang;
  var file = (lang === 'zh' && post.file_zh) ? post.file_zh : post.file;
  try {
    var res = await fetch('posts/' + file);
    var md = await res.text();
    var html = marked.parse(md);
    container.innerHTML = '<p><a href="#" onclick="event.preventDefault(); navigate(\'blog\');">' + I18N[lang].back + '</a></p><article>' + html + '</article>';
  } catch(e) { container.innerHTML = '<p>Failed to load post.</p>'; }
}
async function renderMarkdownPage(basePath, container) {
  var lang = currentLang;
  var file = lang === 'zh' ? basePath + '.zh.md' : basePath + '.en.md';
  try {
    var res = await fetch(file);
    if (!res.ok) res = await fetch(basePath + '.en.md');
    if (!res.ok) { container.innerHTML = '<h1>' + currentPage + '</h1><p style="color:#aaa">' + I18N[lang].coming + '</p>'; return; }
    var md = await res.text();
    container.innerHTML = marked.parse(md);
  } catch(e) { container.innerHTML = '<h1>' + currentPage + '</h1><p>' + I18N[lang].coming + '</p>'; }
}
function renderSidebarPosts() {
  var el = document.getElementById('sidebar-posts');
  var lang = currentLang;
  var recent = postsIndex.slice(0, 5);
  if (recent.length === 0) { el.innerHTML = '<p style="color:#aaa;font-size:0.85em;text-align:center">No posts yet</p>'; return; }
  el.innerHTML = recent.map(function(p) {
    var title = lang === 'zh' ? (p.title_zh || p.title) : p.title;
    return '<div class="rp-item" onclick="navigate(\'blog\',\'' + p.slug + '\')"><div class="rp-cat">' + (p.category||'Uncategorized') + '</div><div class="rp-title">' + title + '</div><div class="rp-date">' + (p.date||'') + '</div></div>';
  }).join('');
}
function renderToolsDropdown() {
  var dd = document.getElementById('tools-dropdown');
  if (siteConfig && siteConfig.tools) {
    dd.innerHTML = siteConfig.tools.map(function(t) { return '<a href="' + (t.url||'#') + '" target="_blank">' + t.name + '</a>'; }).join('');
  }
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
document.addEventListener('DOMContentLoaded', async function() {
  await loadConfig();
  await loadPostsIndex();
  applyI18n();
  renderSidebarPosts();
  renderToolsDropdown();
  navigate('blog');
});