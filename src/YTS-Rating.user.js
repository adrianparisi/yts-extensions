// ==UserScript==
// @name        YTS-Rating
// @description Visible ratings on YTS
// @author      Adrián Parisi
// @homepageURL https://github.com/adrianparisi/yts-rating
// @include     https://yts.to/browse-movies
// @include     https://yts.to/browse-movies?page=*
// @version     0.1
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

var movies = document.getElementsByClassName('browse-movie-wrap');
var star = '&nbsp;&nbsp;<span class="icon-star" style="color:#EEC745"></span>';

for (var i = 0; i < movies.length; i++) {
  var rating = document.createElement('div');
  rating.style['margin-bottom'] = '10px';
  rating.style['font-size'] = '20px';
  rating.innerHTML = movies[i].getElementsByClassName('rating')[0].innerHTML + star;

  movies[i].insertBefore(rating, movies[i].firstChild);
}
