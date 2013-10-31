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
		jsonp: 'components/jquery.jsonp',
		jquery: 'components/jquery/jquery',
		underscore: 'components/underscore/underscore',
		backbone: 'components/backbone/backbone',
		mationette: 'components/marionette/backbone.marionette',
		comet: 'components/cometd/cometd',
		cometJquery: 'components/cometd/jquery.cometd',
		cometController: 'components/cometd/cometd_controller',
		marionette: 'components/marionette/backbone.marionette',
		/*app*/
		app: 'app',
		stage: 'app/stage',
		models: 'app/models',
		collections: 'app/collections',
		views: 'app/views',
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
			deps: ['jquery', 'backbone', 'json']
		},
		jsonp: {
			deps: ['jquery']
		},
		cometJquery: {
			deps: ['comet', 'jquery', 'jsonp']
		},
		cometController: {
			deps: ['jquery', 'comet', 'cometJquery', 'stage']
		}
	},
	urlArgs: "bust=" +  (new Date()).getTime()

});
require(['app', 'backbone', 'cometController'], function (AppView, Backbone, transport) {

	Backbone.Model.prototype._super = function(funcName){
		return this.constructor.prototype[funcName].apply(this, _.rest(arguments));
	}
	window.App = _.extend((window.App || {}), {
		Vent: _.extend({}, Backbone.Events),
		cond: {
			eventCollection: {}
		},
		templates: {}
	});
	new AppView();
	transport.init();
});
