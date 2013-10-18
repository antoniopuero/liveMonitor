/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
define(['.', 'models'], function (Backbone, Event) {
	var Events = Backbone.Collection.extend({
		model: Event
	});
	return Events;
});