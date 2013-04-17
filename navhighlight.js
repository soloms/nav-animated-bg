/*
*	description:
*	this plugin was created to animate navigation elements mouseover effect
*
*	attributes:
*	direction - vertical or horizontal
*	speed - speed of background motion
*	itemelm - navigation item tag in dom structure
*
*	html structure:
*	<div class="selector">
*		<ul>
*			<li class="selected"><a href="">nav item 1</a></li>
*			<li><a href="">nav item 2</a></li>
*		</ul>
*		<i class="active-bg"></i>
*	</div>
*
*	plugin usage:
*	<script type="text/javascript">
*	$(document).ready(function(){
*		$(".selector").navHighlight({
*			direction: 'horizontal',
*			speed : 400,
*		});
*	});
*	</script>
*/
(function($){

    $.fn.navHighlight = function(options){
        options = $.extend({
			direction: 'vertical',
			speed: 400,
			itemelm: 'li'
        }, options);

    var init = function(){
		var selected_el = $(this).find(".selected").length == 0 ? $(this).find(options.itemelm).eq(0) : $(this).find(".selected").css("background", "none"),
			sel_top = selected_el.position().top || 0,
			sel_left = selected_el.position().left || 0,
			menu_el = $(this).find(options.itemelm),
			active_bg = options.direction == 'vertical' ? $(this).find(".active-bg").css('top', sel_top) : $(this).find(".active-bg").width(selected_el.outerWidth()).css("left",sel_left);

		menu_el.mouseenter(function(){
			$this = $(this);

			if ($this.hasClass('selected')) {
				selected_el.removeClass("bgOff");
			} else {
				selected_el.addClass("bgOff");
			}

			if (options.direction == 'vertical') {
				active_bg.stop().animate({
					'top': $this.position().top
				},options.speed);
			} else {
				active_bg.stop().animate({
					'left': $this.position().left,
					'width': $this.outerWidth()
				},options.speed);
			}
		});
		$(this).mouseleave(function(){

			if (options.direction == 'vertical') {
				active_bg.stop().animate({
					'top': sel_top
				},options.speed);
			} else {
				active_bg.stop().animate({
					'left': sel_left,
					'width': selected_el.outerWidth()
				},options.speed);
			}

			setTimeout(function(){
				selected_el.removeClass("bgOff");
			},options.speed);
		});
   };

    return this.each(init);
};
})(jQuery);
