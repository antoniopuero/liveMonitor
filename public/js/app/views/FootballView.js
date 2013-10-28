/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:43
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/views'], function (templates, EventView, EventsView) {

	var FootballView = EventView.extend({
		template: templates.football
	});


	var FootballEventsView = EventsView.extend({
		initialize: function () {
			console.log(this.collection)
			this.renderAllEvents();
		},

		render: function (event) {
			var footballView = new FootballView({model: event});
			this.$el.append(footballView.render().el);
			return this;
		}
	});
	return FootballEventsView;
});
