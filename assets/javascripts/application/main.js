/*============================
=            Main            =
============================*/

;(function ( $ ) {
  'use strict';

  var json = 'main';
  get_template(json);

  (function(){
    var header_source = document.getElementById( 'entry-header' ).innerHTML;
    var header_template = Handlebars.compile( header_source );
    $.get( 'assets/data/header.json', function( data,status,xhr ) {
      var html = header_template(data);
      // Render the posts into the page
      document.getElementById( 'site-header' ).innerHTML = html;

      $( '.link' ).on( 'click', function( event ) {
        event.preventDefault();
        json = $( this ).data( 'link' );
        get_template(json);
      });
    });

    var footer_source = document.getElementById( 'entry-footer' ).innerHTML;
    var footer_template = Handlebars.compile( footer_source );
    $.get( 'assets/data/footer.json', function( data, status, xhr ) {
      var html = footer_template( data );
      // Render the posts into the page
      document.getElementById( 'site-footer' ).innerHTML = html;
    });
  })();

  function get_template(json) {
    var source = document.getElementById( 'entry-template' ).innerHTML;
    var template = Handlebars.compile(source);
    $.get( 'assets/data/' + json + '.json', function( data, status, xhr ) {
      var html = template( data );
      // Render the posts into the page
      document.getElementById( 'output' ).innerHTML = html;
    });
  }

Handlebars.registerPartial('header',
  '<h1>{{title}}</h1>
  <nav>
    <ul>
      {{#links}}
        <li class="menu-item"><a class="link" href="{{link}}" data-link="{{data-link}}">{{title}}</a></li>
      {{/links}}
    </ul>
  </nav>'
);

Handlebars.registerPartial('footer',
  '<ul>
    {{#links}}
      <li class="menu-item"><a href="{{link}}" title="{{title}}"><i class="fa fa-{{icon}}-square"></i></a></li>
    {{/links}}
  </ul>'
);

})( jQuery );

/*-----  End of Main  ------*/