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
		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('add:to', this.render, this);
			this.model.bind('remove:from', this.remove, this);
		},
		render: function () {
			this.$el.attr('starttime', this.model.get('event').start_time);
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		renderMarket: function (markets, size, useForaTemplate, euro) {
			var marketsTemplate = '',
				self = this;
			if (euro) {
				_.each(markets, function (market) {
					marketsTemplate += templates.euroMarketTemplate({market: market, self: self});
				});
			} else {
				_.each(markets, function (market) {
					marketsTemplate += templates.marketTemplate({market: market, self: self, size: size, useForaTemplate: useForaTemplate});
				});
			}
			return marketsTemplate;
		},
		renderEmptyMarket: function () {
			return templates.emptyMarket();
		},
		renderOdds: function (odds, size, useForaTemplate) {
			var oddsTemplate = '',
				self = this,
				width = 'span' + 12/parseInt(size, 10),
				templateEngine = useForaTemplate ? templates.foraOddTemplate : templates.oddTemplate;
			_.each(odds, function (odd) {
				oddsTemplate += templateEngine({width: width, odd: odd, self: self});
			});
			return oddsTemplate;
		},
		renderEuroOdds: function (odds) {
			var oddsTemplate = '',
				self = this;
			_.each(odds, function (odd) {
				oddsTemplate += templates.euroOddTemplate({odd: odd, self: self});
			});
			return oddsTemplate;
		},
		remove: function () {
			this.$el.remove();
		}
	});
	return EventView;
});
