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
		marionette: 'components/marionette/backbone.marionette'
	},
	shim: {
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
			deps: ['jquery', 'comet', 'cometJquery']
		}
	},
	urlArgs: "bust=" +  (new Date()).getTime()

});
require(['app', 'backbone', 'cometController'], function (AppView, Backbone, transport) {
	window.App = {
		Vent: _.extend({}, Backbone.Events)
	};
	App.Vent.once('init:event', function (data) {
		console.log(data);
	});
	App.Vent.once('init:bets', function (data) {
		console.log(data);
	});
	App.Vent.once('init:stat', function (data) {
		console.log(data);
	});
	App.Vent.once('init:dictionary', function (data) {
		console.log(data);
	});
	App.Vent.once('update:event', function (data) {
		console.log(data);
	});
	App.Vent.once('update:bets', function (data) {
		console.log(data);
	});
	App.Vent.once('update:stat', function (data) {
		console.log(data);
	});
	App.Vent.once('update:dictionary', function (data) {
		console.log(data);
	});
	transport.init();
	new AppView();
});
