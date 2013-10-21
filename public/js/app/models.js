/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	var event = Backbone.Collection.extend({
		initialize: function () {
			console.log('new event');
		}
	});
	return event;
});
