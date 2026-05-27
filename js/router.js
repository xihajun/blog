var currentPage = 'blog';
var currentSlug = null;

function navigate(page, slug) {
  currentPage = page;
  currentSlug = slug || null;
  // Update active nav state
  document.querySelectorAll('.top-nav a[data-page]').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
  // Reset search/filter when navigating
  if (!slug) {
    currentSearchQuery = '';
    currentTagFilter = '';
  }
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  var area = document.getElementById('page-content');
  if (currentSlug) { renderPost(currentSlug, area); return; }
  switch (currentPage) {
    case 'blog': renderBlogList(area); break;
    case 'ai': renderAIColumn(area); break;
    case 'research': renderMarkdownPage('pages/research', area); break;
    case 'teaching': renderMarkdownPage('pages/teaching', area); break;
    case 'tools': renderMarkdownPage('pages/tools', area); break;
    case 'projects': renderMarkdownPage('pages/projects', area); break;
    default: renderBlogList(area);
  }
}

// Search overlay
function toggleSearchOverlay() {
  var overlay = document.getElementById('search-overlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    document.getElementById('search-overlay-input').focus();
  }
}

function handleOverlaySearch(event) {
  if (event.key === 'Enter') {
    var q = document.getElementById('search-overlay-input').value.trim();
    toggleSearchOverlay();
    currentSearchQuery = q;
    currentTagFilter = '';
    navigate('blog');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.top-nav a[data-page]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      navigate(a.getAttribute('data-page'));
    });
  });
  // Close search overlay on click outside
  document.getElementById('search-overlay').addEventListener('click', function(e) {
    if (e.target === this) toggleSearchOverlay();
  });
  // Esc key closes overlay
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var overlay = document.getElementById('search-overlay');
      if (overlay.classList.contains('open')) toggleSearchOverlay();
    }
  });
});
