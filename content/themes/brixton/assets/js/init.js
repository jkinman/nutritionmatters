var themeApp = {
    tagcloud:function(){
        var FEED_URL = "/rss/";
        var primary_array = [];
        $.get(FEED_URL, function (data) {
            $(data).find("category").each(function () {
                var el = $(this).text();
                if ($.inArray(el, primary_array) == -1) {
                    primary_array.push(el);
                }
            });
            var formated_tag_list = "";
            for ( var i = 0; i < primary_array.length; i = i + 1 ) {
                var tag = primary_array[ i ];
                var tagLink = tag.toLowerCase().replace(/ /g, '-');
                formated_tag_list += ("<a href=\"/tag/" + tagLink + "\">" + tag + "</a>");
            }
            $('.tag-cloud').append(formated_tag_list);
        });
    },
    init: function() {
        themeApp.tagcloud();
    }
}

jQuery(document).ready(function () {
    "use strict";

    themeApp.init();

    // Search Widget and results
    jQuery("#search-field").ghostHunter({
        results: ".show-result",
        onComplete: function( results ){
            jQuery("#result, #result i").show();
            jQuery("html, body").animate({scrollTop:jQuery('#result').position().top}, 'slow');
	    },
    });

    // Close the result section
	jQuery("#result i").click(function(){
		jQuery(this).parent().fadeOut('slow');
	});

    // Related posts
    jQuery(".related-posts").ghostRelated({
        limit: 3
    });

    // Responsive menu
    jQuery("header .navbar-left").meanmenu({
        meanScreenWidth: 780,
        meanRevealPosition: "center",
    });
});
