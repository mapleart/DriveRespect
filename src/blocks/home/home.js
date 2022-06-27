import Swiper, { Navigation, Mousewheel } from 'swiper';
Swiper.use([Navigation, Mousewheel]);


(() => {

	/* if (document.querySelectorAll(".partners-slider").length) {
		let swiper;

		var prev = document.querySelector('.js-partner-prev')
		var next = document.querySelector('.js-partner-next')

		swiper = new Swiper('.partners-slider', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
					spaceBetween: 60,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			}
		})

		let swiperTariff;
		const enableTariffSwiper = () => {
			swiperTariff = new Swiper(".tariff__slider", {
				modules: [Mousewheel],
				slidesPerView: "auto",
				loop: true,
				speed: 800,
				mousewheel: true,
				navigation: {
					nextEl: '.js-tariff-next',
					prevEl: '.js-tariff-prev',
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
				}
			});
		}


		///

		let swiperProject;
		const enableSwiperProject= () => {
			swiperProject = new Swiper(".project-list", {
				modules: [Mousewheel],
				slidesPerView: "auto",
				speed: 800,
				spaceBetween: 10,
				mousewheel: true,
				pagination: {
					el: '.home__dots',
					clickable: true,
					bulletClass: 'home__dot',
					bulletActiveClass: 'active'
				}
			});
		}


		const breakpoint = window.matchMedia('(max-width:639px)');
		const breakpointSM = window.matchMedia('(max-width:991px)');

		const breakpointChecker = () => {
			if (breakpoint.matches === true) {
				enableSwiperProject();
			} else if ( breakpoint.matches === false ) {
				if (swiperProject !== undefined ) {
					swiperProject.destroy(true, false);
				}
			}

			if (breakpointSM.matches === true) {
				 enableTariffSwiper();
			} else if ( breakpointSM.matches === false ) {
				if (swiperTariff !== undefined ) swiperTariff.destroy(true, false);
			}
		}

		breakpoint.addEventListener('change', breakpointChecker);
		breakpointSM.addEventListener('change', breakpointChecker);
		breakpointChecker();


	}
	 */
})();