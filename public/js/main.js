/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
require.config({
	paths: {
		/* COMPONENTS */
		json: 'components/json2',
		jquery: 'components/jquery/jquery',
		underscore: 'components/underscore/underscore',
		backbone: 'components/backbone/backbone',
		comet: 'components/cometd/cometd',
		cometJquery: 'components/cometd/jquery.cometd',
		cometController: 'components/cometd/cometd_controller',
		marionette: 'components/marionette/backbone.marionette',
		/*app*/
		app: 'app',
		stage: 'app/stage',
		models: 'app/models',
		collections: 'app/collections',
		views: 'app/views/views',
		templates: 'app/views/templates/pre_templates'
	},
	shim: {
		stage: {
			deps: ['jquery', 'underscore']
		},
		models: {
			deps: ['backbone']
		},
		collections: {
			deps: ['backbone', 'models']
		},
		app: {
			deps: ['jquery']
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['backbone', 'json']
		},
		cometJquery: {
			deps: ['comet', 'jquery']
		},
		cometController: {
			deps: ['jquery', 'comet', 'cometJquery', 'stage']
		}
	},
	urlArgs: "bust=" +  (new Date()).getTime()

});
require(['app', 'backbone', 'cometController'], function (AppView, Backbone, transport) {
	window.App = _.extend((window.App || {}), {
		Vent: _.extend({}, Backbone.Events),
		cond: {}
	});
	transport.init();
	new AppView();
});
