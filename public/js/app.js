/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
define(['backbone',
		'stage',
		'collections/FootballCollection',
		'collections/TennisCollection',
		'views/FootballView',
		'views/TennisView'],
	function (Backbone, LiveAPI, FootballCollection, TennisCollection, FootballView, TennisView) {
	var AppView = Backbone.View.extend({
		el: 'body',
		initialize: function () {

			LiveAPI.setColumns(this.$el);
			App.Vent.on('window:resize', this.resize, this);
			window.addEventListener('resize', this.resize, false);
			/*dictionary*/
			App.Vent.once('init:dictionary', function (dict) {
				App.cond.dictionary = dict;
			});
			App.Vent.on('update:dictionary', function (dict) {
				if (dict[0].data) {
					AppView.cond.push(dict[0].data);
				}
			});
			/*bets*/
			App.Vent.once('init:bets', function () {
				App.cond.completeEvents = LiveAPI.checkCompleteEvents(App.cond);
				App.cond.eventCollection.football = new FootballCollection(App.cond.completeEvents.football);
				App.cond.eventCollection.tennis = new TennisCollection(App.cond.completeEvents.tennis);
				new FootballView({collection: App.cond.eventCollection.football});
				new TennisView({collection: App.cond.eventCollection.tennis});
			});
			App.Vent.on('update:bets', function (data) {
				console.log('udpate:bets', data[0]);
			});
			/*update event*/
			App.Vent.on('update:event', function (data) {
				console.log('udpate:event', data[0]);
			});
			/*update event stat*/
			App.Vent.on('update:stat', function (data) {
				console.log('udpate:stat', data[0]);
			});
		},
		resize: function () {
			var styleElement = $('#computed-style');
			LiveAPI.useResizedFonts({
				'.event-hat': [16, 20],
				'.competitors': [16, 35],
				'.begin': [12, 20],
//				'.score': [16, 25],
				'.match-status': [12, 20],
				'.bettype-caption': [12, 25],
				'.outcome': [10, 20],
				'.castcode': [10, 20],
				'.coef': [10,20]
			}, styleElement);
//			LiveAPI.changeEventHeight('.event-wrapper', $('#event-height'));
		},
		/*for some test*/
		cloneEvents: function () {
			var event = $('.event-wrapper');
			for (var i = 0; i < 15; i += 1) {
				this.$el.append(event.clone());
			}
		}
	});
	return AppView;
});
