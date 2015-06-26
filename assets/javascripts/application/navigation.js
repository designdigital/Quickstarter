/*==================================
=            Navigation            =
==================================*/

;(function ( $ ) {
  'use strict';

  $( '.menu-toggle' ).on( 'click', function() {
    var main_menu = $( this ).next( '.main-menu' );
    if( main_menu.hasClass( 'show' ) ) {
      main_menu.removeClass( 'show' );
    } else {
      main_menu.addClass( 'show' );
    }
  });

})( jQuery );

/*-----  End of Navigation  ------*/



