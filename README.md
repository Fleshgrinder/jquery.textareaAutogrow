# jquery.textareaAutogrow

Textareas grow vertically as they become full. This implementation relies on a hidden auxiliary `div` to calculate the
height of the textarea. This plug-in is inspired by the work of [Jason Frame](https://github.com/jaz303/jquery-grab-bag)
and [Jevin O. Sewaruth](https://github.com/jevin/Autogrow-Textarea). I created my own plug-in because I wanted to have
it as fast and clean as possible, combine the best of all available plug-ins and have it available as a
[bower](https://github.com/twitter/bower) component.

## Code quality

Code was checked with [JSHint](http://www.jshint.com/) and no problems were found (be sure to check Browser and jQuery
in the Assume section on the right hand side).

I indent my code with two spaces and a line length of 120. I documented everything as good as I could.

I used [UglifyJS2](https://github.com/mishoo/UglifyJS2) to create the minified version of this plug-in.

## Installation and usage

This jQuery plug-in is available via bower, to install it execute the following command:

```
bower install jquery.textareaAutogrow
```

Include the minified version within your document and bind it like so:

```JavaScript
$('textarea').textareaAutogrow();
```

If you’d like to have an animated textarea while growing use CSS3 to achieve it, e.g.:

```css
textarea {
    -moz-transition: height .5s linear;
     -ms-transition: height .5s linear;
      -o-transition: height .5s linear;
 -webkit-transition: height .5s linear;
         transition: height .5s linear;
}
```

## License

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/.

![CC-BY-SA 3.0 Unported](http://i.creativecommons.org/l/by-sa/3.0/88x31.png)
