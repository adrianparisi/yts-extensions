// ==UserScript==
// @name        YTS-Extensions
// @description Visible ratings and navigation with arrows to YTS.to web page.
// @author      Adrián Parisi
// @homepageURL https://github.com/adrianparisi/yts-rating
// @include     http://yts.to/browse-movies*
// @include     https://yts.to/browse-movies*
// @version     0.2
// @grant       none
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://www.greasespot.net)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
*/

function addRating() {
  var movies = document.getElementsByClassName('browse-movie-wrap');
  var star = '&nbsp;&nbsp;<span class="icon-star" style="color:#EEC745"></span>';

  for (var i = 0; i < movies.length; i++) {
    var rating = document.createElement('div');
    rating.style['margin-bottom'] = '10px';
    rating.style['font-size'] = '20px';
    rating.innerHTML = movies[i].getElementsByClassName('rating')[0].innerHTML + star;

    movies[i].insertBefore(rating, movies[i].firstChild);
  }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function addNavigation() {
  $(document).keypress(function(e) {
    var left = 37;
    var right = 39;
    var url = window.location.href;
    var follow;

    if (e.keyCode === left || e.keyCode === right) {
      var page = parseInt(getParameterByName('page'));

      if (e.keyCode === left) {
        if (page && page != 1) {
          follow = updateQueryStringParameter(url, 'page', page - 1);
        }
      }
      else if (e.keyCode === right) {
        if (!page) {
          if (url.indexOf('?') === -1) {
            follow = url + '?page=' + (page + 1);
          }
          else {
            follow = url + '&page=' + (page + 1);
          }
        }
        else {
          follow = updateQueryStringParameter(url, 'page', page + 1);
        }
      }

      window.location.replace(follow);
    }
  });
}

addRating();
addNavigation();
