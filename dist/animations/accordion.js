/*--------------------------------------------------------------
# Accordions
--------------------------------------------------------------*/

jQuery(document).ready(function() {
	jQuery('.kd-accordion .open')
		.children('.kd-accordion--content')
		.slideDown();

	jQuery('.kd-accordion .kd-accordion--headline').on('click', function() {
		var $this = jQuery(this);
		$span = $this.closest('section');

		$open = $this
			.closest('.kd-accordion')
			.find('section.open')
			.not($span);

		//Close open accordions
		//$open.children('.accordion--content').slideUp(); // Activate to open and close
		$open.removeClass('open');

		//Open selected accordion
		$span.toggleClass('open');
		$this.next('.kd-accordion .kd-accordion--content').slideToggle();
	});

	/* Shuffle */
	jQuery('.kd-accordion-shuffle .open')
		.children('.kd-accordion--content')
		.slideDown();
	jQuery('.kd-accordion-shuffle .kd-accordion--headline').on(
		'click',
		function() {
			var $this = jQuery(this);
			$span = $this.closest('section');

			$open = jQuery('.kd-accordion-shuffle .open').not($span);

			//Close open accordions
			$open.children('.kd-accordion--content').slideUp(); // Activate to open and close
			$open.removeClass('open');

			//Open selected accordion
			$span.toggleClass('open');
			$this.next('.kd-accordion-shuffle .kd-accordion--content').slideToggle();
		}
	);
});
