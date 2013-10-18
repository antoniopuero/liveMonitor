/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define(['.'], function (Backbone) {
	var EventView = Backbone.View.extend({
		className: 'listItem',
		template: '',//App.templates.Event,
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	var EventsView = Backbone.View.extend({
		initialize: function () {
			this.renderAllEvents();
		},
		renderAllEvents: function () {
			this.$el.empty();
			this.collection.each(this.render, this);
		},
		render: function (event) {
			var eventView = new EventView({model: event});
			this.$el.append(eventView.render().el);
			return this;
		}
	});
	return EventsView;
});