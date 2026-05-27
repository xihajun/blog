var siteConfig = null;
var postsIndex = [];
var currentSearchQuery = '';
var currentTagFilter = '';

async function loadConfig() {
  try {
    var res = await fetch('config.json');
    siteConfig = await res.json();
    if (siteConfig.name) { I18N.zh.name = siteConfig.name_zh || siteConfig.name; I18N.en.name = siteConfig.name; }
    if (siteConfig.bio_zh) I18N.zh.bio = siteConfig.bio_zh;
    if (siteConfig.bio_en) I18N.en.bio = siteConfig.bio_en;
    if (siteConfig.avatar) document.querySelector('.avatar').src = siteConfig.avatar;
    if (siteConfig.social) {
      var icons = document.querySelectorAll('.social-icon');
      siteConfig.social.forEach(function(s, i) { if (icons[i]) icons[i].href = s.url; });
    }
  } catch(e) { console.log('No config.json found, using defaults.'); }
}

async function loadPostsIndex() {
  try { var res = await fetch('posts/index.json'); postsIndex = await res.json(); } catch(e) { postsIndex = []; }
}

function getFilteredPosts(columnFilter) {
  var lang = currentLang;
  var posts = postsIndex.filter(function(p) {
    return !p.lang || p.lang === lang || p.lang === 'both';
  });
  if (columnFilter) {
    posts = posts.filter(function(p) { return p.column === columnFilter; });
  }
  if (currentTagFilter) {
    posts = posts.filter(function(p) {
      return p.tags && p.tags.indexOf(currentTagFilter) !== -1;
    });
  }
  if (currentSearchQuery) {
    var q = currentSearchQuery.toLowerCase();
    posts = posts.filter(function(p) {
      var title = lang === 'zh' ? (p.title_zh || p.title) : p.title;
      var excerpt = lang === 'zh' ? (p.excerpt_zh || p.excerpt || '') : (p.excerpt || '');
      var tags = (p.tags || []).join(' ');
      return title.toLowerCase().indexOf(q) !== -1 ||
             excerpt.toLowerCase().indexOf(q) !== -1 ||
             (p.category || '').toLowerCase().indexOf(q) !== -1 ||
             tags.toLowerCase().indexOf(q) !== -1;
    });
  }
  return posts;
}

function getAllTags(columnFilter) {
  var tagSet = {};
  postsIndex.forEach(function(p) {
    if (columnFilter && p.column !== columnFilter) return;
    if (p.tags) p.tags.forEach(function(tag) { tagSet[tag] = true; });
  });
  return Object.keys(tagSet).sort();
}

function renderSearchBar(columnFilter) {
  var html = '<div class="search-bar">';
  html += '<input type="text" class="search-input" placeholder="' + t('search') + '" value="' + (currentSearchQuery || '') + '" onkeyup="handleSearch(event, \'' + (columnFilter||'') + '\')">';
  html += '<button class="search-btn" onclick="doSearch(\'' + (columnFilter||'') + '\')">' + t('searchBtn') + '</button>';
  html += '</div>';
  var tags = getAllTags(columnFilter);
  if (tags.length > 0) {
    html += '<div class="tag-bar">';
    html += '<span class="tag-chip' + (!currentTagFilter ? ' active' : '') + '" onclick="filterByTag(\'\', \'' + (columnFilter||'') + '\')">' + t('allTags') + '</span>';
    tags.forEach(function(tag) {
      html += '<span class="tag-chip' + (currentTagFilter === tag ? ' active' : '') + '" onclick="filterByTag(\'' + tag + '\', \'' + (columnFilter||'') + '\')">' + tag + '</span>';
    });
    html += '</div>';
  }
  return html;
}

function handleSearch(event, columnFilter) {
  if (event.key === 'Enter') doSearch(columnFilter);
}

function doSearch(columnFilter) {
  var input = document.querySelector('.search-input');
  currentSearchQuery = input ? input.value.trim() : '';
  renderCurrentPage();
}

function filterByTag(tag, columnFilter) {
  currentTagFilter = tag;
  renderCurrentPage();
}

function renderPostList(posts, lang) {
  if (posts.length === 0) return '<p class="no-results">' + t('noResults') + '</p>';
  var html = '';
  posts.forEach(function(p) {
    var title = lang === 'zh' ? (p.title_zh || p.title) : p.title;
    var excerpt = lang === 'zh' ? (p.excerpt_zh || p.excerpt || '') : (p.excerpt || '');
    var tagsHtml = '';
    if (p.tags && p.tags.length) {
      tagsHtml = '<div class="blog-tags">' + p.tags.map(function(tag) {
        return '<span class="post-tag">' + tag + '</span>';
      }).join('') + '</div>';
    }
    html += '<div class="blog-item">';
    html += '<div class="blog-meta"><span class="meta-cat">' + (p.category||'') + '</span> · ' + (p.date||'') + '</div>';
    html += '<h3 onclick="navigate(\'blog\',\'' + p.slug + '\')">' + title + '</h3>';
    html += '<p class="blog-excerpt">' + excerpt + '</p>';
    html += tagsHtml;
    html += '</div>';
  });
  return html;
}

function renderBlogList(container) {
  var lang = currentLang;
  var posts = getFilteredPosts('blog');
  var html = '<div class="blog-column">';
  html += '<div class="column-header blog-column-header"><h2>✍️ ' + t('blogColumnTitle') + '</h2><p>' + t('blogColumnDesc') + '</p></div>';
  html += renderSearchBar('blog');
  html += '<div class="blog-list">';
  html += renderPostList(posts, lang);
  html += '</div></div>';
  container.innerHTML = html;
}

function renderAIColumn(container) {
  var lang = currentLang;
  var posts = getFilteredPosts('ai');
  var html = '<div class="ai-column">';
  html += '<div class="ai-column-header"><h2>🤖 ' + t('aiColumnTitle') + '</h2><p>' + t('aiColumnDesc') + '</p></div>';
  html += renderSearchBar('ai');
  html += '<div class="blog-list">';
  html += renderPostList(posts, lang);
  html += '</div></div>';
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
    var backPage = (post.column === 'ai') ? 'ai' : 'blog';
    var tagsHtml = '';
    if (post.tags && post.tags.length) {
      tagsHtml = '<div class="post-tags-detail">' + post.tags.map(function(tag) {
        return '<span class="post-tag">' + tag + '</span>';
      }).join('') + '</div>';
    }
    container.innerHTML = '<p style="margin-bottom:16px"><a href="#" onclick="event.preventDefault(); navigate(\'' + backPage + '\');" style="color:var(--accent-dark);font-weight:500">' + t('back') + '</a></p><article>' + html + '</article>' + tagsHtml;
  } catch(e) { container.innerHTML = '<p>Failed to load post.</p>'; }
}

async function renderMarkdownPage(basePath, container) {
  var lang = currentLang;
  var file = lang === 'zh' ? basePath + '.zh.md' : basePath + '.en.md';
  try {
    var res = await fetch(file);
    if (!res.ok) res = await fetch(basePath + '.en.md');
    if (!res.ok) { container.innerHTML = '<div style="text-align:center;padding:60px 0;color:var(--text-light)">' + t('coming') + '</div>'; return; }
    var md = await res.text();
    container.innerHTML = '<article>' + marked.parse(md) + '</article>';
  } catch(e) { container.innerHTML = '<div style="text-align:center;padding:60px 0;color:var(--text-light)">' + t('coming') + '</div>'; }
}

function renderSidebarPosts() {
  var el = document.getElementById('sidebar-posts');
  if (!el) return;
  var lang = currentLang;
  var recent = postsIndex.slice(0, 5);
  if (recent.length === 0) { el.innerHTML = '<p style="color:var(--text-light);font-size:0.82em;text-align:center">No posts yet</p>'; return; }
  el.innerHTML = recent.map(function(p) {
    var title = lang === 'zh' ? (p.title_zh || p.title) : p.title;
    return '<div class="rp-item" onclick="navigate(\'blog\',\'' + p.slug + '\')"><div class="rp-cat">' + (p.category||'') + '</div><div class="rp-title">' + title + '</div><div class="rp-date">' + (p.date||'') + '</div></div>';
  }).join('');
}

function renderToolsDropdown() {
  var dd = document.getElementById('tools-dropdown');
  if (!dd) return;
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
