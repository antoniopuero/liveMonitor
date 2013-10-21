/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
define(['backbone', 'stage'], function (Backbone, LiveAPI) {
	var AppView = Backbone.View.extend({
		el: 'body',
		initialize: function () {
			window.addEventListener('resize', this.resize, false);
		},
		resize: function () {
			var styleElement = $('#computed-style');
			var fontSizes = {
				comp: LiveAPI.resizeFonts($('.competitors'), 30),
				bettypeCapt: LiveAPI.resizeFonts($('.bettype-caption'), 20),
				outcome: LiveAPI.resizeFonts($('.outcome'), 20),
			}
			var style = '.competitors {' +
				'font-size: ' + fontSizes.comp + 'px; }\n' +
				'.begin {' +
				'font-size: ' + fontSizes.comp + 'px; }\n' +
				'.score {' +
				'font-size: ' + fontSizes.comp + 'px; }\n' +
				'.status {' +
				'font-size: ' + fontSizes.comp + 'px; }\n' +
				'.bettype-caption {' +
				'font-size: ' + fontSizes.bettypeCapt  + 'px; }\n' +
				'.outcome {' +
				'font-size: ' + fontSizes.outcome + 'px; }\n' +
				'.castcode {' +
				'font-size: ' + fontSizes.outcome + 'px; }\n' +
				'.coef {' +
				'font-size: ' + fontSizes.outcome + 'px; }';
			styleElement.text(style);
		}
	});
	return AppView;
});
