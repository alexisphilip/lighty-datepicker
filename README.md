# lighty-datepicker.js

`lighty-datepicker.js` is a plain JavaScript library allowing its user to easily access one or multiple
datepicker(s) when clicking on an input.

> Warning: all the comments in the source code are written in French, as I wrote this code a long time ago, not thinking
> it could be used by people throughout the world.

## Usage

It is very simple. Simply include `lighty-datepicker.js` or `lighty-datepicker.min.js` and add `light-datepicker` class
to the `input` element.

```html
<input class="lighty-datepicker" type="text">
```

### Parameters

You can add `data` parameters to the `input` HTML element with `data-lighty_datepicker` data attribute.

```text
width          - Changes the width or the date picker whilst keeping the same ratio (height will be affected).
bg_header      - Changes the header's background color.
bg_calendar    - Changes the calendar's background color.
bg_icon        - Changes the icon's background color.
color_header   - Changes the header's font color.
color_calendar - Changes the calendar's font color.
```

Complete example:

```html
<input
    class="lighty-datepicker"
    data-lighty_datepicker="
        width: 200;
        bg_header: linear-gradient(to right top,#ff6347, #db5670);
        color_header: #e3e3e3;
        bg_body: linear-gradient(to right top, #a55980, #705873, #4f4f4f);
        color_body: #e3e3e3">
```

Examples of usage shown in `src/index.html`.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - see the LICENSE.md file for details.

## Author

Alexis Philip ([Website](https://alexisphilip.fr),
[GitHub](https://github.com/alexis-philip),
[LinkedIn](https://www.linkedin.com/in/alexis-philip-019955176)). 