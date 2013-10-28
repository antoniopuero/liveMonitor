/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'backbone', 'views/singleView'], function (templates, Backbone, EventView) {


	var EventsView = Backbone.View.extend({
		initialize: function () {

			this.collection = App.cond.eventCollection;
			this.renderAllEvents();
		},

		el: 'body',

		renderAllEvents: function () {
			this.collection.each(this.render, this);
			this.afterRender();
		},

		afterRender: function () {
			App.Vent.trigger('window:resize');
		},

		render: function (event) {
			var eventView = new EventView({model: event});
			console.log(eventView);
			this.$el.append(eventView.render().el);
			return this;
		}
	});
	return EventsView;
});
