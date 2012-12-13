/*
 * FlatTurtle
 * Wrapper Qt Browser application object
 *
 * @author: Jens Segers (jens@irail.be)
 * @license: AGPLv3
 */

var Power = {

	enable : function() {
		if (typeof application == "object") {
		    try {
		        application.enableScreen(true);
		    } catch (err) {}
		}
	},

	disable : function() {
		if (typeof application == "object") {
		    try {
		        application.enableScreen(false);
            } catch (err) {}
		}

		document.location.href = '../sleep';
	},

	destroy : function() {}

};