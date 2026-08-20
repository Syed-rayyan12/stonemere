
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
      const symbol = btn.querySelector('span');
      if (symbol) symbol.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });

  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const track = slider.querySelector('.testimonials-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    let current = 0;
    let timer;

    const goTo = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    slider.querySelector('.slider-prev')?.addEventListener('click', () => {
      goTo(current - 1);
      restart();
    });
    slider.querySelector('.slider-next')?.addEventListener('click', () => {
      goTo(current + 1);
      restart();
    });
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
      goTo(i);
      restart();
    }));

    const start = () => { timer = setInterval(() => goTo(current + 1), 6500); };
    const restart = () => { clearInterval(timer); start(); };
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', start);
    start();
  }

  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.navlinks');
  menu?.addEventListener('click', () => {
    nav?.classList.toggle('mobile-open');
  });
});


/* FINAL HERO SLIDER */
(function(){
  const slider = document.querySelector('.hero-slider');
  if(!slider) return;

  const slides = [...slider.querySelectorAll('.hero-slide')];
  const dots = [...slider.querySelectorAll('.hero-dot')];
  const prev = slider.querySelector('.hero-prev');
  const next = slider.querySelector('.hero-next');
  let current = 0;
  let timer;

  function show(index){
    current = (index + slides.length) % slides.length;
    slides.forEach((s,i)=>s.classList.toggle('active', i === current));
    dots.forEach((d,i)=>d.classList.toggle('active', i === current));
  }
  function start(){
    clearInterval(timer);
    timer = setInterval(()=>show(current + 1), 6500);
  }

  prev?.addEventListener('click',()=>{show(current-1);start();});
  next?.addEventListener('click',()=>{show(current+1);start();});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();}));

  slider.addEventListener('mouseenter',()=>clearInterval(timer));
  slider.addEventListener('mouseleave',start);
  start();
})();

/* FINAL FAQ ACCORDION */
(function(){
  const items = [...document.querySelectorAll('.final-faq-item')];
  if(!items.length) return;

  items.forEach(item=>{
    const button = item.querySelector('button');
    const answer = item.querySelector('.final-faq-answer');
    const icon = item.querySelector('i');

    button.addEventListener('click',()=>{
      const willOpen = !item.classList.contains('open');

      items.forEach(other=>{
        other.classList.remove('open');
        other.querySelector('button')?.setAttribute('aria-expanded','false');
        const otherIcon = other.querySelector('i');
        if(otherIcon) otherIcon.textContent = '+';
      });

      if(willOpen){
        item.classList.add('open');
        button.setAttribute('aria-expanded','true');
        if(icon) icon.textContent = '−';
      }
    });
  });
})();

/* Final FAQ: isolated handler */
document.querySelectorAll('.final-faq-item > button').forEach(button=>{
  button.addEventListener('click',()=>{
    const item=button.closest('.final-faq-item');
    const open=!item.classList.contains('open');
    document.querySelectorAll('.final-faq-item').forEach(other=>{
      other.classList.remove('open');
      other.querySelector('button')?.setAttribute('aria-expanded','false');
      const icon=other.querySelector('i');
      if(icon) icon.textContent='+';
    });
    if(open){
      item.classList.add('open');
      button.setAttribute('aria-expanded','true');
      const icon=item.querySelector('i');
      if(icon) icon.textContent='−';
    }
  });
});


/* =========================================================
   STONEMERE — PREMIUM ENHANCEMENT PASS (site-wide)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* Header shadow / compact state on scroll */
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Back-to-top button */
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.type = 'button';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '&uarr;';
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  /* Scroll-reveal — classes added dynamically, so the page is fully
     visible by default and only animates if this script actually runs */
  const revealTargets = document.querySelectorAll(
    '.card, .quote, .blogcard, .price, .case, .split > div, ' +
    '.final-faq-item, .home-faq .faq-item, ' +
    '.pagehero .eyebrow, .pagehero h1, .pagehero .lead'
  );
  if (revealTargets.length) {
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 90) + 'ms';
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealTargets.forEach((el) => io.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    }
    /* safety net: guarantee visibility even if the observer never fires */
    setTimeout(() => revealTargets.forEach((el) => el.classList.add('is-visible')), 4000);
  }

});
