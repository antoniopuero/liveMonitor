/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:43
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/collectionView'], function (templates, EventView, EventsView) {

	var FootballView = EventView.extend({
		template: templates.footballTemplate,
		initialize: function () {
//			console.log('render football')
		},
		renderHat: function () {
			return templates.footballHatTemplate(this.model.attributes);
		},
		renderTimeBets: function (statusCode) {
			console.log(statusCode);
			if (statusCode == 1) {
				return templates.firstTimeTemplate(this.model.attributes);
			} else if (statusCode == 2) {
				return templates.secondTimeTemplate(this.model.attributes);
			}
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
