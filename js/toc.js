// Sidebar TOC with scroll-spy — replaces Recent Posts when reading an article
var tocScrollHandler = null;
var sidebarOriginalHTML = null;

function buildTOC() {
  removeTOC();
  var article = document.querySelector('article');
  if (!article) return;
  var headings = article.querySelectorAll('h1, h2, h3');
  if (headings.length < 2) return;

  // Assign IDs
  headings.forEach(function(h, i) {
    if (!h.id) h.id = 'heading-' + i;
  });

  // Save original sidebar content
  var dynamicSection = document.getElementById('sidebar-dynamic');
  if (dynamicSection) {
    sidebarOriginalHTML = dynamicSection.innerHTML;
  }

  // Build TOC HTML
  var tocHtml = '<div class="toc-wrapper" id="toc-wrapper">';
  tocHtml += '<div class="toc-header">' + (currentLang === 'zh' ? '\u76ee\u5f55' : 'Contents') + '</div>';
  tocHtml += '<nav class="toc-nav">';
  headings.forEach(function(h, i) {
    var level = parseInt(h.tagName.charAt(1));
    var indent = level === 1 ? 'toc-h1' : (level === 2 ? 'toc-h2' : 'toc-h3');
    var text = h.textContent.trim();
    if (text.length > 35) text = text.substring(0, 33) + '\u2026';
    tocHtml += '<a href="#' + h.id + '" class="toc-link ' + indent + '" data-index="' + i + '" onclick="tocClick(event, \'' + h.id + '\')">' + text + '</a>';
  });
  tocHtml += '</nav>';
  tocHtml += '<div class="toc-progress"><div class="toc-progress-bar" id="toc-progress-bar"></div></div>';
  tocHtml += '</div>';

  // Replace sidebar content
  if (dynamicSection) {
    dynamicSection.innerHTML = tocHtml;
  }

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
    // Progress bar
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    var bar = document.getElementById('toc-progress-bar');
    if (bar) bar.style.width = Math.min(progress, 100) + '%';
  };
  window.addEventListener('scroll', tocScrollHandler, { passive: true });
  tocScrollHandler();
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
  if (tocScrollHandler) {
    window.removeEventListener('scroll', tocScrollHandler);
    tocScrollHandler = null;
  }
  // Restore original sidebar
  if (sidebarOriginalHTML !== null) {
    var dynamicSection = document.getElementById('sidebar-dynamic');
    if (dynamicSection) {
      dynamicSection.innerHTML = sidebarOriginalHTML;
    }
    sidebarOriginalHTML = null;
  }
  // Also remove any old floating TOC
  var old = document.getElementById('toc-float');
  if (old) old.remove();
}
