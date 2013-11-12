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
		'views/TennisView',
		'views/infoMessageView'],
	function (Backbone, LiveAPI, FootballCollection, TennisCollection, FootballView, TennisView, infoMessageView) {
	var AppView = Backbone.View.extend({
		el: 'body', //CONTAINER ELEMENT
		initialize: function () { //THIS FIRE WHEN new AppView IS CALL (LIKE __CONSTRUCT)

			new infoMessageView(); //INITIALIZING OF INFOMESSAGE VIEW (WATCH THE /VIEWS/INFOMESSAGEVIEW.JS TO DEEPER UNDERSTANDONG)

			LiveAPI.setColumns(this.$el); //THIS.$EL IS BODY ELEMENT WRAPPED BY JQUERY OBJECT. SETCOLUMN METHOD SET COLUMNS-NUMBER PROPERTY, WHICH IS GIVEN BY THE URL PARAM, TO ELEMENT

			App.Vent.trigger('infomessage', 'loading'); //INFOMESSAGE VIEW IS LISTEN TO INFOMESSAGE EVENTS AND WAITS FOR ONE ARGUMENT, WHICH IS NAME OF MESSAGE TYPE

			App.Vent.on('window:resize', this.resize, this); //FIRE WHEN ALL EVENTS WERE RENDERED AND RESIZE THE FONT SIZE
			window.addEventListener('resize', this.resize, false); //SUBSCRIBE TO RESIZE EVENTS AND FIRE THE RESIZE FUNCTION OF APPVIEW

			/*dictionary*/

			App.Vent.once('init:dictionary', function (dict) { //LISTEN TO COMET EVENTS AND SET PROPERTIES OF CONDITIONAL OBJECT
				App.cond.dictionary = dict;
			});
			App.Vent.on('update:dictionary', function (dict) { //LISTEN TO COMET UPDATE EVENT OF DICTIONARY
				if (dict[0].data) { //IT CAN PASS WITHOUT DATA, AND WHEN IT IS - DO NOTHING
					AppView.cond.dictinary.push(dict[0].data); //ADD TO CONDITIONAL DICTIONARY OBJECT WHEN NEW DATA BECAME
				}
			});

			/*updates*/
			App.Vent.on('update:event', function (data) {//LISTEN TO COMET UPDATE EVENT OF EVENT
				LiveAPI.updateRouter(data, 'event', LiveAPI.updateEvent); //MORE ABOUT UPDATE ROUTER IN LIVEAPI DOCUMENTATION
			});
			App.Vent.on('update:stat', function (data) {//LISTEN TO COMET UPDATE EVENT OF EVENT_STAT
				LiveAPI.updateRouter(data, 'event_stat', LiveAPI.updateEventStat);
			});
			App.Vent.on('update:bets', function (data) {//LISTEN TO COMET UPDATE EVENT OF BETTYPES
				LiveAPI.updateRouter(data, 'bettypes', LiveAPI.updateBettypes);
			});

			/*init bets*/
			App.Vent.once('init:bets', function () { //FIRST RENDER BEGINS WHEN INITIAL BETTYPES HAVE BECAME
				App.cond.completeEvents = LiveAPI.checkCompleteEvents(App.cond); // MORE ABOUT checkCompleteEvents IN LIVEAPI DOCUMENTATION
				App.cond.eventCollection.football = new FootballCollection(App.cond.completeEvents.football); //SAVING THE FOOTBALL EVENTS COLLECTION TO CONDITIONAL OBJECT
				App.cond.eventCollection.tennis = new TennisCollection(App.cond.completeEvents.tennis); //SAVING THE TENNIS EVENTS COLLECTION TO CONDITIONAL OBJECT
				new FootballView({collection: App.cond.eventCollection.football}); //INITIATION OF FOOTBALL EVENTS VIEW
				new TennisView({collection: App.cond.eventCollection.tennis}); //INITIATION OF TENNIS EVENTS VIEW
				App.afterInit = true; //AFTER INIT FLAG SET TO TRUE
			});

		},
		resize: function () { //RESIZE FUNCTION IS FOR SMART FONT RESIZING OF ALL ELEMENTS OF EVENT VIEW
			var styleElement = $('#computed-style'); //STYLE ELEMENT, WHICH ALREADY EXISTS IN INDEX.HTML TEMPLATE
			LiveAPI.useResizedFonts({ //MORE ABOUT THIS METHOD IN LIVEAPI DOCUMENTATION
				'.event-hat': [16, 20],
				'.competitors': [18, 40, 'doubleWidth'], //FOR EXAMPLE, KEY IS SELECTOR FOR ELEMENTS, FIRST ELEMENT OF VALUE ARRAY IS MIN SIZE, SECOND - MAX SIZE, THIRD  - WHEN TO USE DOUBLE WIDTH OF ELEMENT (FOR LONG PLAYERS NAMES)
				'.begin': [12, 20],
				'.score': [16, 25],
				'.status': [12, 20],
				'.to-start': [12, 20],
				'.bettype-caption': [12, 25],
				'.outcome': [10, 20],
				'.castcode': [10, 20],
				'.coef': [10,20],
				'.setscore .row-fluid .row-fluid': [16, 20]
			}, styleElement);
		}
	});
	return AppView; // SIMPLY RETURNS APPVIEW, THIS HOW REQUIRES MODULE WORKS
});
