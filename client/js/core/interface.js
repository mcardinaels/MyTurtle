/*
 * FlatTurtle
 * The panes object will take care of the interface elements and colors
 *
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

window.Interface = (function() {

    // Interface configuration
    var config = {};

    /*
     * Execute all functions for passed config
     */
    function setup(config) {
        Interface.config = config;

        if (config.color)
            color(config.color);

        if (config.logo)
            logo(config.logo);
    }

    /*
     * Change the ui color
     */
    function color(value) {
        // just return the color value if no value is given
        if (value == null)
            return Interface.config.color;

        // set to config
        Interface.config.color = value.replace('#', '');

        // style element
        var custom = $('body style#custom');
        if (custom.length == 0) {
            custom = $('<style type="text/css" id="custom"></style>');
            $('body').prepend(custom);
        }

        // custom styles
		var lightColor = tinycolor.desaturate(tinycolor.lighten(value));
		var darkColor = tinycolor.desaturate(tinycolor.darken(value));
        var style = ".text-color { color: " + value + "; }\n"
                  + ".bg-color { background-color: " + value + "; }\n"
                  + ".bg-color-light { background-color: " + lightColor + "; }\n"
                  + ".bg-color-dark { background-color: " + darkColor + "; }\n"
                  + ".border-color { border-color: " + value + " transparent; }\n"
                  + ".border-color-light { border-color: " + lightColor + " transparent; }\n";

        // add to body
        custom.html(style);
    }

    /*
     * Set the footer logo url
     */
    function logo(url) {
        $('footer img#client-logo').attr('src', url);
    }

    /*
     * Public interface to this object
     */
    return {
        config : config,
        setup : setup,
        color : color,
        logo : logo
    };

}());