/*
	Shesher Kobita — page behaviour. The page is fully usable without this
	file: it only adds the mobile menu, carousel, scroll-spy and polish.
	Each block is isolated so one failure never takes down the others.
*/
(function ($) {
	'use strict';

	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function safely(fn) {
		try { fn(); } catch (err) { if (window.console) console.error(err); }
	}

	/* Mobile menu ---------------------------------------------------------- */
	safely(function () {
		var toggler = document.querySelector('.classy-navbar-toggler');
		var closer = document.querySelector('.classycloseIcon');
		var menu = document.getElementById('site-menu');
		var container = document.querySelector('.classy-nav-container');
		var bars = document.querySelector('.navbarToggler');
		if (!toggler || !menu) return;
		var mobile = window.matchMedia('(max-width: 991px)');

		function isOpen() { return menu.classList.contains('menu-on'); }

		function setOpen(open, returnFocus) {
			menu.classList.toggle('menu-on', open);
			if (bars) bars.classList.toggle('active', open);
			toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
			document.body.classList.toggle('sk-menu-open', open);
			if (open) {
				/* the panel only becomes focusable once its visibility has flipped */
				window.setTimeout(function () {
					var first = menu.querySelector('.classynav a');
					if (first) first.focus();
				}, 50);
			} else if (returnFocus) {
				toggler.focus();
			}
		}

		function syncBreakpoint() {
			if (container) {
				container.classList.toggle('breakpoint-on', mobile.matches);
				container.classList.toggle('breakpoint-off', !mobile.matches);
			}
			if (!mobile.matches && isOpen()) setOpen(false, false);
		}

		toggler.addEventListener('click', function () { setOpen(!isOpen(), true); });
		if (closer) closer.addEventListener('click', function () { setOpen(false, true); });
		menu.addEventListener('click', function (e) {
			if (e.target.closest('a') && isOpen()) setOpen(false, false);
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && isOpen()) setOpen(false, true);
		});
		document.addEventListener('click', function (e) {
			if (isOpen() && !menu.contains(e.target) && !toggler.contains(e.target)) setOpen(false, false);
		});
		if (mobile.addEventListener) mobile.addEventListener('change', syncBreakpoint);
		else if (mobile.addListener) mobile.addListener(syncBreakpoint);
		syncBreakpoint();
	});

	/* In-page links: move focus to the target so keyboard users follow. ---- */
	safely(function () {
		document.addEventListener('click', function (e) {
			var link = e.target.closest('a[href^="#"]');
			if (!link) return;
			var id = link.getAttribute('href').slice(1);
			var target = id && document.getElementById(id);
			if (!target) return;
			window.setTimeout(function () {
				if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
				target.focus({ preventScroll: true });
			}, reduceMotion ? 0 : 450);
		});
	});

	/* Scroll-spy for the section nav --------------------------------------- */
	safely(function () {
		if (!('IntersectionObserver' in window)) return;
		var links = {};
		document.querySelectorAll('#nav .classynav a[href^="#"]').forEach(function (a) {
			links[a.getAttribute('href').slice(1)] = a;
		});
		var current = null;
		function activate(id) {
			if (current === id) return;
			current = id;
			Object.keys(links).forEach(function (key) {
				var on = key === id;
				links[key].classList.toggle('active', on);
				if (on) links[key].setAttribute('aria-current', 'true');
				else links[key].removeAttribute('aria-current');
			});
		}
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) activate(entry.target.id);
			});
		}, { rootMargin: '-35% 0px -60% 0px' });
		Object.keys(links).forEach(function (id) {
			var section = document.getElementById(id);
			if (section) observer.observe(section);
		});
	});

	/* Hero carousel -------------------------------------------------------- */
	safely(function () {
		var $slides = $('.hero-slides');
		if (!$slides.length || !$.fn.owlCarousel) return;
		var hero = document.querySelector('.hero-area');
		var controls = hero.querySelector('.hero-controls');
		var pauseBtn = hero.querySelector('.hero-pause');
		var count = $slides.children().length;
		var index = 0;
		var timer = null;
		var userPaused = reduceMotion;
		var hovering = false;
		var pauseLabel = pauseBtn.getAttribute('aria-label');

		$slides.owlCarousel({
			items: 1,
			loop: false,
			nav: false,
			dots: false,
			mouseDrag: true,
			touchDrag: true,
			smartSpeed: reduceMotion ? 0 : 900
		});

		function syncHidden() {
			$slides.find('.owl-item').each(function (i) {
				var active = i === index;
				this.setAttribute('aria-hidden', active ? 'false' : 'true');
			});
		}

		function go(i) {
			index = (i + count) % count;
			$slides.trigger('to.owl.carousel', [index]);
		}

		function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
		function start() {
			stop();
			if (userPaused || hovering || count < 2) return;
			timer = window.setInterval(function () { go(index + 1); }, 6000);
		}

		$slides.on('changed.owl.carousel', function (e) {
			if (e.item && typeof e.item.index === 'number') index = e.item.index;
			syncHidden();
		});

		hero.querySelector('.hero-prev').addEventListener('click', function () { go(index - 1); start(); });
		hero.querySelector('.hero-next').addEventListener('click', function () { go(index + 1); start(); });
		pauseBtn.addEventListener('click', function () {
			userPaused = !userPaused;
			pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
			pauseBtn.querySelector('.fas').className = 'fas ' + (userPaused ? 'fa-play' : 'fa-pause');
			pauseBtn.setAttribute('aria-label', pauseLabel);
			if (userPaused) stop(); else start();
		});
		hero.addEventListener('mouseenter', function () { hovering = true; stop(); });
		hero.addEventListener('mouseleave', function () { hovering = false; start(); });
		hero.addEventListener('focusin', function () { hovering = true; stop(); });
		hero.addEventListener('focusout', function (e) {
			if (!hero.contains(e.relatedTarget)) { hovering = false; start(); }
		});

		if (userPaused) {
			pauseBtn.setAttribute('aria-pressed', 'true');
			pauseBtn.querySelector('.fas').className = 'fas fa-play';
		}
		controls.hidden = false;
		syncHidden();
		start();
	});

	/* Reveal on scroll ----------------------------------------------------- */
	safely(function () {
		if (reduceMotion || window.innerWidth < 768 || !('IntersectionObserver' in window)) return;
		var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
		var fold = window.innerHeight;
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				entry.target.classList.remove('is-pending');
				entry.target.classList.add('animated', 'fadeInUp');
				observer.unobserve(entry.target);
			});
		}, { rootMargin: '0px 0px -10% 0px' });
		items.forEach(function (el) {
			if (el.getBoundingClientRect().top < fold) return;
			el.classList.add('is-pending');
			observer.observe(el);
		});
	});

	/* Back-to-top button ---------------------------------------------------- */
	safely(function () {
		var btn = document.getElementById('scrollUp');
		if (!btn) return;
		var ticking = false;
		function update() {
			btn.hidden = window.scrollY < window.innerHeight;
			ticking = false;
		}
		window.addEventListener('scroll', function () {
			if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
		}, { passive: true });
		update();
	});
})(jQuery);
