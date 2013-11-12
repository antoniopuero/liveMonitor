/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'backbone'], function(templates, Backbone) {


	var EventsView = Backbone.View.extend({

		el: 'body', //CONTAINER ELEMENT

		renderAllEvents: function() { //FOR ITERATING RENDERING OF ALL MODULES IN COLLECTION
			this.collection.each(this.render, this); // CALL THIS.RENDER FOR EACH MODEL IN COLLECTION
			this.afterRender(); //AFTER RENDERING CALL
		},

		afterRender: function() {
			App.Vent.trigger('window:resize'); //FIRE WINDOW:RESIZE EVENT, WHICH LISTENED BY APP VIEW (INITIAL VIEW)
		},

		resortByTime: function () { //WHEN ALL COLLECTIONS ARE RENDERED, THIS METHOD IS SORTING DOM ELEMENT BY STARTTIME ATTRIBUTE
			this.$el.find('.event-wrapper').sort(function (a, b) {
				return parseInt($(a).attr('starttime'), 10) - parseInt($(b).attr('starttime'), 10); //STANDART ARRAY#SORT METHOD IS USED HERE
			}).appendTo(this.$el); //AND APPEND IT TO HTML LAYOUT
		},

		deleteEvent: function (eventModel) { //FIRE WHEN MODEL WERE REMOVED FROM COLLECTION
			eventModel.trigger('remove:from'); //FIRE REMOVE:FROM EVENT, WHICH LISTENED BY MODEL VIEW
		},

		addEvent: function (eventModel) { //FIRE WHEN NEW EVENT WAS ADDED TO COLLECTION
			App.Vent.trigger('infomessage:hide'); //IT WORKS ONLY WHEN NO ONE EVENTS WERE IN LAYOUT BEFORE NEW EVENT WAS ADDED
			eventModel.trigger('add:to'); //FIRE ADD:TO EVENT, WHICH LISTENED BY MODEL VIEW
			this.resortByTime(); //RESORT BY TIME ALL EVENTS IN LAYOUT
		},

		checkEvents: function () { //RETURNS TRUE WHEN AT LEAST ONE EVENT IS IN LAYOUT
			return this.$el.find('.event-wrapper').length;
		}
	});
	return EventsView; //I'LL REPEAT, BUT THIS IS HOW REQUIREJS MODULE WORKS
});
