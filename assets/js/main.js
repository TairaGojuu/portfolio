(function () {
  document.documentElement.classList.add('js');
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });

  var imgs = Array.prototype.slice.call(document.querySelectorAll('img[data-full]'));
  var lb = document.querySelector('.lb');
  if (!lb || !imgs.length) return;
  var big = lb.querySelector('img'), cap = lb.querySelector('p'), cur = 0;
  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    big.src = imgs[cur].src; big.alt = imgs[cur].alt;
    var f = imgs[cur].parentNode.querySelector('figcaption');
    cap.textContent = f ? f.textContent : '';
  }
  function open(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  imgs.forEach(function (im, i) { im.addEventListener('click', function () { open(i); }); });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.p').onclick = function () { show(cur - 1); };
  lb.querySelector('.n').onclick = function () { show(cur + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
