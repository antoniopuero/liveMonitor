/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:43
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/collectionView', 'stage'], function (templates, EventView, EventsView, LiveAPI) {

	var FootballView = EventView.extend({
		template: templates.footballTemplate,
		renderHat: function () {
			return templates.footballHatTemplate(this.model.attributes);
		},
		renderTimeBets: function (statusCode) {
            var self = this;
//			console.log(statusCode);
			if (statusCode == 1) {
				return templates.firstTimeTemplate({model: this.model.attributes, self: self});
			} else if (statusCode == 2) {
				return templates.secondTimeTemplate({model: this.model.attributes, self: self});
			}
		}
	});


	var FootballEventsView = EventsView.extend({
		initialize: function () {
			this.collection.bind('remove', this.deleteEvent, this);
			this.collection.bind('add', this.addEvent, this);
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
