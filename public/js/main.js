/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
/**
 * all requirements and dependencies are described here
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
	//CONDITIONAL OBJECT FOR ALL PARTS OF APPLICATION
	window.App = _.extend((window.App || {}), {
		Vent: _.extend({}, Backbone.Events), // EVENT AGREGATOR
		cond: { //ALL INFORMATION STORE IN THIS OBJECT AND BACKBONE COLLECTIONS AND MODELS ARE HERE TOO
			eventCollection: {} //THIS ONE WILL CONTAINS FOOTBALL AND TENNIS COLLECTIONS OF EVENTS
		},
		afterInit: false //FOR SOME REASON UPDATES CAN BECAME BEFORE INITIAL BETTYPES AND THIS FLAG IS SET TO TRUE WHEN FIRST RENDER WILL FIRE
	});
	new AppView(); //INITIALIZE MAIN INSTRUCTION FOR LIVE APPLICATION TO RUN
	transport.init(); //THIS ONE START COMET AGREGATING AND SUBSCRIBES TO LIVE CHANNEL
});
