/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:45
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'backbone', 'stage'], function (templates, Backbone, LiveAPI) {


	var EventView = Backbone.View.extend({
		className: 'event-wrapper', //THE DIV ELEMENT WITH PROVIDED CLASS

		initialize: function () {
			/*SUBSCRIBING TO DIFFERENT EVENTS TO PROVIDE CORRECT VIEW FOR USER*/
			this.model.bind('change', this.render, this);
			this.model.bind('add:to', this.render, this);
			this.model.bind('remove:from', this.remove, this);
		},

		render: function () { //RENDER MODEL VIEW
			this.$el.attr('starttime', this.model.get('event').start_time); //ADD STARTTIME ATTRIBUTE FOR SORTING
			this.$el.html(this.template(this.model.attributes)); //SET TEMPLATE TO CONTAINER DIV
			return this;
		},

		renderMarket: function (markets, size, useForaTemplate, euro) { //FOR MARKET RENDERING;
			/*MARKETS IS ARRAY OF BETTYPE MARKETS,
			* SIZE - HOW MANY ODDS CAN BE IN ONE RAW (AND I THEY ARE IN ONE MARKET),
			* USEFORETEMPLATE - FLAG, WHERE TO RENDER OUTCOMES WITH VALUES,
			* EURO - FLAG, THAT INDICATE WHERE TO USE UERO MARKET AND ODD TEMPLATES*/
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

		renderEmptyMarket: function () { //RETURN AN EMPTY MARKET (FOR VISUAL ESTETIC VIEW)
			return templates.emptyMarket();
		},

		renderOdds: function (odds, size, useForaTemplate) { //RENDER ODD OF PROVIDED MARKET
			/*ODD - ARRAY OF ONE MARKET,
			* SIZE IS GIVEN BY THE RENDERmARKET METHOD,
			* AND USEFORATEMPLATE TOO*/
			var oddsTemplate = '',
				self = this,
				width = 'span' + 12/parseInt(size, 10),//SPAN12 HAS A WIDTH 100%, THIS IS FOR RESPONSIVE DESIGN
				templateEngine = useForaTemplate ? templates.foraOddTemplate : templates.oddTemplate; //IF FORATEMPLATE - USER ANOTHER TEMPLATE
			_.each(odds, function (odd) {
				oddsTemplate += templateEngine({width: width, odd: odd, self: self});
			});
			return oddsTemplate;
		},

		renderEuroOdds: function (odds) { //THIS IS FOR RENDERING ODD WITHOUT OUTCOMES
			var oddsTemplate = '',
				self = this;
			_.each(odds, function (odd) {
				oddsTemplate += templates.euroOddTemplate({odd: odd, self: self});
			});
			return oddsTemplate;
		},

		remove: function () { //FOR REMOVING ENDED AND REMOVED EVENTS, FIRE WHEN MODEL ARE REMOVED FROM COLLECTION
			this.$el.remove();
		},

		renderStoppedLayer: function (empty) { //THIS IS FOR BETSTATUS STOOPED AND NOT_STARTED EVENTS
			if (empty) {
				return '';
			} else {
				return templates.stoppedLayerTemplate();
			}
		}

	});
	return EventView;
});
