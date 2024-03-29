/**
 * @author [Richard Fussenegger]{@link http://richard.fussenegger.info/}
 * @version 0.0.1
 * @license [Creative Commons Attribution-ShareAlike 3.0 Unported]{@link http://creativecommons.org/licenses/by-sa/3.0/}
 */

/**
 * @param {jQuery} $
 * @param {Object} window
 * @returns {void}
 */
;(function ($, window) {
  'use strict';

  /**
   * <h1>jquery.textareaAutogrow</h1>
   * <p>Textareas grow vertically as they become full. This implementation relies on a hidden auxiliary <code>div</code>
   * to calculate the height of the textarea. This plug-in is inspired by the work of
   * <a href="https://github.com/jaz303/jquery-grab-bag">Jason Frame</a> and
   * <a href="https://github.com/jevin/Autogrow-Textarea">Jevin O. Sewaruth</a>. I created my own plug-in because I
   * wanted to have it as fast and clean as possible, combine the best of all available plug-ins and have it available
   * as a <a href="https://github.com/twitter/bower">bower</a> component.</p>
   * <h2>Code quality</h2>
   * <p>Code was checked with <a href="http://www.jshint.com/">JSHint</a> and no problems were found (Be sure to check
   * Browser and jQuery in the Assume section on the right hand side).</p>
   * <p>I indent my code with two spaces and a line length of 120. I documented everything as good as I could.</p>
   * <p>I used <a href="http://marijnhaverbeke.nl/uglifyjs">UglifyJS</a> to create the minimifed version of this
   * plug-in.</p>
   * <h2>Installation</h2>
   * <p>This jQuery plug-in is available via bower, to install it execute the following command:</p>
   * <pre>bower install jquery.textareaAutogrow</pre>
   * <p>Include the minified version within your document and bind it like so:</p>
   * <pre>$('textarea').textareaAutogrow();</pre>
   * <p>If you’d like to have an animated textarea while growing use CSS3 to achieve it, e.g.:</p>
   * <pre>textarea {
   *      -moz-transition: height .5s linear;
   *       -ms-transition: height .5s linear;
   *        -o-transition: height .5s linear;
   *   -webkit-transition: height .5s linear;
   *           transition: height .5s linear;
   * }</pre>
   * <h2>License</h2>
   * <p>This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of
   * this license, visit <a href="http://creativecommons.org/licenses/by-sa/3.0/">
   * http://creativecommons.org/licenses/by-sa/3.0/</a>.</p>
   * <h2>Weblinks</h2>
   * <ul>
   *   <li><a href="https://github.com/Fleshgrinder/jquery.textareaAutogrow">GitHub repository</a></li>
   *   <li><a href="http://richard.fussenegger.info/">My website</a></li>
   * </ul>
   *
   * @syntax $('textarea').textareaAutogrow();
   * @return {jQuery.Object} The jQuery object this plug-in was called with to maintain chaining of methods.
   */
  $.fn.textareaAutogrow = function () {
    // Only act on textareas!
    return this.filter('textarea:not(.textarea-autogrow)').each(function () {
      /**
       * Reference to the current textarea (jQuery object).
       * @type jQuery.Object
       */
      var $self = $(this);

      /**
       * The hidden <code>div</code> which we use to compute the height of the textarea.
       * @type jQuery.Object
       */
      var $mirror = $('<div>').css({
        display: 'none',
        wordWrap: 'break-word',
        width: $self.width(),
        padding: $self.css('padding'),
        fontFamily: $self.css('font-family'),
        fontSize: $self.css('font-size'),
        fontWeight: $self.css('font-weight'),
        lineHeight: $self.css('line-height')
      });

      /**
       * Automatically grow the current textarea according to content.
       * @return {void}
       */
      var textareaAutogrow = function () {
        /**
         * The content of the current textarea.
         * @type String
         */
        var text = $self.val();

        /**
         * Special HTML entities we want to replace within our mirror of the textarea.
         * @type Array
         */
        var escape = [
          [ '<', '&lt;' ],
          [ '>', '&gt;' ],
          [ '&', '&amp;' ],
          [ '\n', '<br/>' ],
          [ '"', '&quot;' ],
          [ "'", '&#39;' ],
          [ ' ', '&nbsp;' ]
        ];

        // We use a loop (DRY) and array functions instead of replace (performance).
        for (var i = 0; i < escape.length; ++i) {
          text = text.split(escape[i][0]).join(escape[i][1]);
        }

        // Insert the escaped string into our mirror element and set the new height on the textarea.
        $self.css('height', $mirror.html(text + '.<br/>.').height());
      };

      // Prepare the textarea and create the hidden mirror.
      $self
        .addClass('textarea-autogrow')
        .css({ overflow: 'hidden', minHeight: $self.height() })
        .after($mirror)
        .bind('input propertychange', textareaAutogrow)
      ;

      // React on resizing of the browser window (responsive designs).
      $(window).resize(function () {
        // Recompute minimum height of textarea.
        $self.css({ height: '', minHeight: $self.height() });

        // Update the complete CSS of the mirror, within a responsive design everything might have changed.
        $mirror.css({
          width: $self.width(),
          padding: $self.css('padding'),
          fontFamily: $self.css('font-family'),
          fontSize: $self.css('font-size'),
          fontWeight: $self.css('font-weight'),
          lineHeight: $self.css('line-height')
        });

        // Fire the event so updates are reflected within our textarea and mirror.
        textareaAutogrow();
      });

      // Fire the event once to set the content of the mirror.
      textareaAutogrow();
    });
  };

})(jQuery, window);