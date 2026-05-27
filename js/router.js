var currentPage = 'blog';
var currentPostSlug = null;
function navigate(page, slug) {
  currentPage = page;
  currentPostSlug = slug || null;
  document.querySelectorAll('.topnav a[data-page]').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
  renderCurrentPage();
}
function renderCurrentPage() {
  var area = document.getElementById('page-content');
  if (currentPostSlug) { renderPost(currentPostSlug, area); return; }
  switch (currentPage) {
    case 'blog': renderBlogList(area); break;
    case 'research': renderMarkdownPage('pages/research', area); break;
    case 'teaching': renderMarkdownPage('pages/teaching', area); break;
    case 'tools': renderMarkdownPage('pages/tools', area); break;
    case 'projects': renderMarkdownPage('pages/projects', area); break;
    default: renderBlogList(area);
  }
}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.topnav a[data-page]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigate(a.getAttribute('data-page'));
    });
  });
});