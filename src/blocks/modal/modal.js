import scrollLock from 'scroll-lock';
import { addUnderlay } from "../../js/lib";

(() => {
	let cls = 'modal';
	
	addUnderlay(cls);
	let $modal = $(`#${cls}__underlay`);

	if ($modal.length) {
		let close = function(e) {
			e.preventDefault();
			if(typeof scrollLock !== 'undefined') {
				scrollLock.clearQueueScrollLocks();
				scrollLock.enablePageScroll();
			}
	
			$modal
				.attr('class', `${cls}`)
				.find(`.${cls}__content`)
				.empty()
				.end()
				.hide();
		}
	
		let open = function(e) {
			e.preventDefault();
			if(typeof scrollLock !== 'undefined') scrollLock.disablePageScroll();
			
			if ($modal.is(":visible")) close(e);
			let id = $(this).data('modal') || 'error';
			let content = (id == '#') ? $(this).html() : $('#' + id).html();
	
			$modal
				.addClass(id != '#' ? `${cls}_${id}`:`${cls}_self`)
				.find(`.${cls}__content`)
				.html(content)
				.end()
				.fadeIn();
		}
		
		// Открыть модальное окно
		$(`[data-${cls}]`).on('click', open);
		// Открыть модальное окно из уже открытого окна
		$modal.on('click', `[data-${cls}]`, open);
		// Закрыть окошко
		$(`.${cls}__close`).on('click', close);
		// Закрыть по клику мимо окошка или esc
		$(window).on('click keyup', function(e) {
			if (e.target == $modal[0] || e.which == 27) close(e);
		});
	}

})();
