$.fn.autoSizeElements = function(params) {
    this.each(function() {
	params = $.extend( {handleBoxModel: false}, params);

	$this = $(this)
	$this.data("params", params);
	$this.data("default-container-width", $this.width());
	$this.addClass("auto_size_elements");
	$container = $this;
	sum_of_child_widths = 0;
	$this.children(":not(.no_auto)").each(function(child) {
	    $child = $(this);
	    $child.data("non-scaled-width", $child.outerWidth(true));
	    $child.data("extra-width", $child.outerWidth(true) - $child.width());
	    sum_of_child_widths = sum_of_child_widths + $child.outerWidth(true);
	});
	$this.data("default-container-width", sum_of_child_widths);
	$this.children(":not(.no_auto)").each(function(child) {
	    $child = $(this);
	    $child.data("non-scaled-container-width", sum_of_child_widths);
	    
	});
//	alert($(this).attr('id'));
	$(this).doAutoSize();

    });
    return this;
}

$.fn.doAutoSize = function() {
    this.each(function() {
	$container = $(this)
	params = $container.data("params");
	container_width = $container.width();
	$container.children().each(function() {
	    $child = $(this);
	    non_scaled_width = $child.data("non-scaled-width");
	    non_scaled_container_width = $child.data("non-scaled-container-width");
	    width_percentage = non_scaled_width / non_scaled_container_width;
	    new_width = width_percentage * container_width;
	    if (params.handleBoxModel) {
		new_width = new_width - $child.data('extra-width');
	    }
	    $child.width(Math.floor(new_width) + "px");
	    
	});
    });
}


$( window ).resize(function() {
    $(".auto_size_elements").doAutoSize();
});

