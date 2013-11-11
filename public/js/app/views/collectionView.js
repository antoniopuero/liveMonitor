/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'backbone', 'views/singleView'], function(templates, Backbone, EventView) {


	var EventsView = Backbone.View.extend({
		initialize: function() {

			this.collection = App.cond.eventCollection;
			this.renderAllEvents();
		},

		el: 'body',

		renderAllEvents: function() {
			this.collection.each(this.render, this);
			this.afterRender();
		},

		afterRender: function() {
			App.Vent.trigger('window:resize');
		},

		resortByTime: function () {
			this.$el.find('.event-wrapper').sort(function (a, b) {
				return parseInt($(a).attr('starttime'), 10) - parseInt($(b).attr('starttime'), 10);
			}).appendTo(this.$el);
		},
		deleteEvent: function (eventModel) {
			eventModel.trigger('remove:from');
		},
		addEvent: function (eventModel) {
			eventModel.trigger('add:to');
			this.resortByTime();
		}
	});
	return EventsView;
});
