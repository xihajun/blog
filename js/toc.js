// Floating Table of Contents with scroll-spy
var tocScrollHandler = null;

function buildTOC() {
  removeTOC();
  var article = document.querySelector('article');
  if (!article) return;
  var headings = article.querySelectorAll('h1, h2, h3');
  if (headings.length < 2) return; // Don't show TOC for very short articles

  // Assign IDs to headings if missing
  headings.forEach(function(h, i) {
    if (!h.id) h.id = 'heading-' + i;
  });

  // Build TOC HTML
  var tocHtml = '<div class="toc-float" id="toc-float">';
  tocHtml += '<div class="toc-header">' + (currentLang === 'zh' ? '\u76ee\u5f55' : 'Contents') + '</div>';
  tocHtml += '<nav class="toc-nav">';
  headings.forEach(function(h, i) {
    var level = parseInt(h.tagName.charAt(1));
    var indent = level === 1 ? 'toc-h1' : (level === 2 ? 'toc-h2' : 'toc-h3');
    var text = h.textContent.trim();
    if (text.length > 40) text = text.substring(0, 38) + '...';
    tocHtml += '<a href="#' + h.id + '" class="toc-link ' + indent + '" data-index="' + i + '" onclick="tocClick(event, \'' + h.id + '\')">' + text + '</a>';
  });
  tocHtml += '</nav>';
  tocHtml += '<div class="toc-progress"><div class="toc-progress-bar" id="toc-progress-bar"></div></div>';
  tocHtml += '</div>';

  // Insert into DOM
  var tocContainer = document.createElement('div');
  tocContainer.innerHTML = tocHtml;
  document.body.appendChild(tocContainer.firstChild);

  // Scroll spy
  var tocLinks = document.querySelectorAll('.toc-link');
  tocScrollHandler = function() {
    var scrollPos = window.scrollY + 100;
    var currentIndex = -1;
    headings.forEach(function(h, i) {
      if (h.getBoundingClientRect().top + window.scrollY <= scrollPos) {
        currentIndex = i;
      }
    });
    tocLinks.forEach(function(link, i) {
      link.classList.toggle('active', i === currentIndex);
    });
    // Update progress bar
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    var bar = document.getElementById('toc-progress-bar');
    if (bar) bar.style.width = Math.min(progress, 100) + '%';
  };
  window.addEventListener('scroll', tocScrollHandler, { passive: true });
  tocScrollHandler(); // Initial call
}

function tocClick(event, id) {
  event.preventDefault();
  var el = document.getElementById(id);
  if (el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}

function removeTOC() {
  var existing = document.getElementById('toc-float');
  if (existing) existing.remove();
  if (tocScrollHandler) {
    window.removeEventListener('scroll', tocScrollHandler);
    tocScrollHandler = null;
  }
}
