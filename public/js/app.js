/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
define(['backbone', 'stage', 'collections/Events', 'views'], function (Backbone, LiveAPI, EventCollection, EventsView) {
	var AppView = Backbone.View.extend({
		el: 'body',
		initialize: function () {

			LiveAPI.setColumns(this.$el);
			App.Vent.on('window:resize', this.resize, this);
			window.addEventListener('resize', this.resize, false);

			App.Vent.once('init:bets', function () {
				App.cond.completeEvents = LiveAPI.checkCompleteEvents(App.cond);
				App.cond.eventCollection = new EventCollection(App.cond.completeEvents);
				new EventsView();
			});
			App.Vent.once('update:event', function (data) {
			});
			App.Vent.once('update:bets', function (data) {
				console.log(data);
			});
			App.Vent.once('update:stat', function (data) {
				console.log(data);
			});
			App.Vent.once('update:dictionary', function (data) {
				console.log(data);
			});
		},
		resize: function () {
			var styleElement = $('#computed-style');
			LiveAPI.useResizedFonts({
				'.competitors': [20, 30],
				'.service-inform': [16, 20],
				'.score': [16, 25],
				'.status': [16, 25],
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
