(function ($){
  $.fn.igjs = function(options) {
    var t = this;
    var settings = $.extend({
      // These are the default settings
        user: 'instagram',
        posts: 12,
        perRow: 4,
    }, options );

    // Scrapes the html from user page via cors proxy and parses it into meaningful json (currently hardcoded to append bootstrap formatted images)
    function getPosts(user, postCount, perRow, el) {
      var $this = {
        posts: []
      }
      columns = 12 / perRow;
      $.getJSON('https://allorigins.me/get?url=' + encodeURIComponent('https://instagram.com/' + user + '/'), function (data) { // get the html
        var posts = $.parseJSON(data.contents.split('window._sharedData = ')[1].split('\;\<\/script>')[0]).entry_data.ProfilePage[0].user.media.nodes //parse the html into array of posts
        posts.forEach(function (e, i) { // cycle through posts and create presentation html for each one
          $this.posts.push(e)
          if (i < postCount) el.append('<div class="col-xs-' + columns + ' ig-img-wrap"><a title="See on Instagram" target="_blank" href="http://instagram.com/p/' + e.code + '"><img alt="Chucks Furniture Instagram Photo ' + (i + 1) + '" class="img-responsive ig-img ig-img-' + (i + 1) + '" src="' + e.thumbnail_src + '"></a></div>')
        })
      });
      return $this.posts
    }
    getPosts(settings.user, settings.posts, settings.perRow, t);
    return t;
  }
}(jQuery));