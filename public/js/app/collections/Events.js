/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 22.10.13
 * Time: 10:13
 * To change this template use File | Settings | File Templates.
 */
define(['models/Event'], function (Event) {
	var Events = Backbone.Collection.extend({
		model: Event, //SET MODEL OF COLLECTION WHICH IS DEFINED IN MODELS/EVENT.JS
		comparator: function (model) { //COMPARATOR FOR PRESORTING OF EVENTS BY START TIME
			return parseInt(model.get('event').start_time);
		}
	});
	return Events;
});
