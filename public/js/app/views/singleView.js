/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:45
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'backbone', 'stage'], function (templates, Backbone, LiveAPI) {


	var EventView = Backbone.View.extend({
		className: 'event-wrapper',
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		renderMarket: function (markets, size, useForaTemplate) {
			var marketsTemplate = '',
				self = this;
			_.each(markets, function (market) {
				marketsTemplate += templates.marketTemplate({market: market, self: self, size: size, useForaTemplate: useForaTemplate});
			});
			return marketsTemplate;
		},
		renderOdds: function (odds, size, useForaTemplate) {
			var oddsTemplate = '',
				self = this,
				width = 'span' + 12/parseInt(size, 10),
				templateEngine = useForaTemplate ? templates.foraOddTemplate: templates.oddTemplate;
			_.each(odds, function (odd) {
				oddsTemplate += templateEngine({width: width, odd: odd, self: self});
			});
			return oddsTemplate;
		}
	});
	return EventView;
});
