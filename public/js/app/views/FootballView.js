/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:43
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/views'], function (templates, EventView, EventsView) {

	var FootballView = EventView.extend({
		template: templates.football,
		initialize: function () {
			window.App.templates.market = templates.market;
			window.App.templates.odd = templates.odd;
		},
		renderMarket: function () {
			console.log('jopa');
		},
		renderOdd: function () {

		}
	});


	var FootballEventsView = EventsView.extend({
		initialize: function () {
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
