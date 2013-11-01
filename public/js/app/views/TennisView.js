/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:42
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/collectionView'], function (templates, EventView, EventsView) {

	var TennisView = EventView.extend({
		template: templates.tennisTemplate,
		initialize: function () {
		},
		renderHat: function () {
			var self = this;
			return templates.tennisHatTemplate({model: this.model.attributes, self: self});
		},
		renderScore: function (status) {
			if (status == "not_started") {
				templateEngine = templates.beforeScpreTemplate;
			} else {
				templateEngine = templates.tennisScoreTemplate;
			}
//			return templateEngine(this.model.attributes);
			return '<div></div>'
		},
		renderSetBets: function () {

		},
		getPeriod: function (status) {
			var period =  /\d/.exec(status);
			return period ? period[0] : false;
		}
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
