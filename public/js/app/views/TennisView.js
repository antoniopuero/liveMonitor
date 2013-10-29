/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:42
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/views'], function (templates, EventView, EventsView) {

	var TennisView = EventView.extend({
		template: templates.tennisTemplate
	});


	var TennisEventsView = EventsView.extend({
		initialize: function () {
			this.renderAllEvents();
		},

		render: function (event) {
			var tennisView = new TennisView({model: event});
			this.$el.append(tennisView.render().el);
			return this;
		}
	});
	return TennisEventsView;
});
