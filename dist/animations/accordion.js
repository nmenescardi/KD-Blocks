/*--------------------------------------------------------------
# Accordions
--------------------------------------------------------------*/

jQuery(document).ready(function() {
	jQuery('.accordion .open')
		.children('.accordion--content')
		.slideDown();

	jQuery('.accordion .accordion--headline').on('click', function() {
		var $this = jQuery(this);
		$span = $this.closest('section');

		$open = $this
			.closest('.accordion')
			.find('section.open')
			.not($span);

		//Close open accordions
		//$open.children('.accordion--content').slideUp(); // Activate to open and close
		$open.removeClass('open');

		//Open selected accordion
		$span.toggleClass('open');
		$this.next('.accordion .accordion--content').slideToggle();
	});

	/* Shuffle */
	jQuery('.accordion-shuffle .open')
		.children('.accordion--content')
		.slideDown();
	jQuery('.accordion-shuffle .accordion--headline').on('click', function() {
		var $this = jQuery(this);
		$span = $this.closest('section');

		$open = jQuery('.accordion-shuffle .open').not($span);

		//Close open accordions
		$open.children('.accordion--content').slideUp(); // Activate to open and close
		$open.removeClass('open');

		//Open selected accordion
		$span.toggleClass('open');
		$this.next('.accordion-shuffle .accordion--content').slideToggle();
	});
});
