/*
Main website JavaScript
*/
(function() {

'use strict';

// unsupported browser
if (!window.addEventListener || !window.history || !window.requestAnimationFrame || !document.getElementsByClassName) return;


// cache name
const
  CACHE = '::PWAsite',
  offlineURL = '/offline/';

// enable service worker
if ('serviceWorker' in navigator) {

  // register service worker
  navigator.serviceWorker.register('/service-worker.js');

  // populate offline page list
  let pageList = document.getElementById('cachedpagelist');
  if (pageList && 'caches' in window) showOfflinePages(pageList);

}


// fetch array of offline pages
function showOfflinePages(list) {

  // fetch all caches
  window.caches.keys()
    .then(cacheList => {

      // find caches by and order by most recent
      cacheList = cacheList
        .filter(cName => cName.includes(CACHE))
        .sort((a, b) => a - b);

      // open first cache
      caches.open(cacheList[0])
        .then(cache => {

          // fetch cached pages
          cache.keys()
            .then(reqList => {

              var frag = document.createDocumentFragment();

              reqList
                .map(req => req.url)
                .filter(req => (req.endsWith('/') || req.endsWith('.html')) && !req.endsWith(offlineURL))
                .sort()
                .forEach(req => {
                  let
                    li = document.createElement('li'),
                    a = li.appendChild(document.createElement('a'));
                    a.setAttribute('href', req);
                    a.textContent = a.pathname;
                    frag.appendChild(li);
                });

              list.appendChild(frag);

            });

        })

    });

}


// remove URL #target after navigation animation and page unload
window.addEventListener('unload', removeTarget, false);

var nav = document.getElementById('nav');
if (nav) nav.addEventListener('animationend', removeTarget, false);

function removeTarget() {
  history.replaceState('', document.title, location.pathname + location.search);
}


// progressive image loader
window.addEventListener('load', function() {

  // start
  var pItem = document.getElementsByClassName('progressive replace'), timer;

  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', scroller, false);
  inView();


  // throttled scroll/resize
  function scroller(e) {

    timer = timer || setTimeout(function() {
      timer = null;
      requestAnimationFrame(inView);
    }, 300);

  }


  // image in view?
  function inView() {

    var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
    while (p < pItem.length) {

      cRect = pItem[p].getBoundingClientRect();
      pT = wT + cRect.top;
      pB = pT + cRect.height;

      if (wT < pB && wB > pT) {
        loadFullImage(pItem[p]);
        pItem[p].classList.remove('replace');
      }
      else p++;

    }

  }


  // replace with full image
  function loadFullImage(item) {

    if (!item || (!item.href && !item.dataset.href)) return;

    // load image
    var img = new Image();
    if (item.dataset) {
      img.srcset = item.dataset.srcset || '';
      img.sizes = item.dataset.sizes || '';
    }
    img.src = item.href || item.dataset.href;
    img.className = 'reveal';
    if (img.complete) addImg();
    else img.onload = addImg;

    // replace image
    function addImg() {

      // disable click
      item.addEventListener('click', function(e) { e.preventDefault(); }, false);

      // add full image
      item.appendChild(img).addEventListener('animationend', function(e) {

        // remove preview image
        var pImg = item.querySelector && item.querySelector('img.preview');
        if (pImg) {
          e.target.alt = pImg.alt || '';
          item.removeChild(pImg);
          e.target.classList.remove('reveal');
        }

      }, false);

    }

  }

}, false);

})();
