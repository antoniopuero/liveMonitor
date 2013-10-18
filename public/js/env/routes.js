/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define(['.'], function (Backbone) {
	var Main = Backbone.Router.extend({
		routes: {
			'': 'home'
		},
		home: function () {
			console.log('home');
		}
	});
	return Main;
});