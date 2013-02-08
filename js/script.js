/***************************************************
	  SELECT MENU ON SMALL DEVICES
***************************************************/
$(function ($) {

    /* get twitter feed */
    $("#twitter-feed").getTwitter({
        userName: "timbjames",
        numTweets: 5,
        loaderText: "Loading tweets...",
        slideIn: true,
        slideDuration: 750,
        showHeading: true,
        headingText: "Latest Tweets",
        showProfileLink: true,
        showTimestamp: true,
        includeRetweets: false,
        excludeReplies: true
    });

    /* get flickr feed */
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      {
          tags: "mount rainier",
          tagmode: "any",
          format: "json"
      },
      function (data) {
          var $li, $a, $img;
          $.each(data.items, function (i, item) {
              $li = $('<li />').append($('<a />', { attr: { href: '#'} }).append($('<img />', { attr: { src: item.media.m} })));
              $li.appendTo("#flickr-feed");
              //<li><a href="" title=""><img alt="Flickr" src="/img/6795452380_3ffa150da3_s.jpg"></a></li>
              //$("<img/>").attr("src", item.media.m).appendTo("#flickr-feed");
              if (i == 12) return false;
          });
      });

    var $menu_select = $("<select />");
    $("<option />", { "selected": "selected", "value": "", "text": "Site Navigation" }).appendTo($menu_select);
    $menu_select.appendTo(".nav-container");

    $(".nav-container ul li a").each(function () {
        var menu_url = $(this).attr("href");
        var menu_text = $(this).text();
        if ($(this).parents("li").length == 2) { menu_text = '- ' + menu_text; }
        if ($(this).parents("li").length == 3) { menu_text = "-- " + menu_text; }
        if ($(this).parents("li").length > 3) { menu_text = "--- " + menu_text; }
        $("<option />", { "value": menu_url, "text": menu_text }).appendTo($menu_select)
    })

    field_id = ".nav-container select";
    $(field_id).change(function () {
        value = $(this).attr('value');
        window.location = value;
        //go

    });
})





