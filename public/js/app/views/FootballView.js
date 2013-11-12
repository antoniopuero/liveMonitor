/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:43
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/collectionView'], function (templates, EventView, EventsView) {

	var FootballView = EventView.extend({

		template: templates.footballTemplate, //TEMPLATE FROM TEMPLATES OBJECT. ALL EVENTS TEMPLATE HAS FIXED BETTYPES LAYOUT

		renderTimeBets: function (statusCode) { //CHECK WHAT STATUS OF EVENT AND RENDER SOME VARIABLE PERIOD TEMPLATES
            var self = this;
			if (statusCode == 1) { //THIS IS CODE OF FIRST TIME
				return templates.firstTimeTemplate({model: this.model.attributes, self: self});
			} else if (statusCode == 2) { //THIS IS CODE OF SECOND TIME
				return templates.secondTimeTemplate({model: this.model.attributes, self: self});
			}
		}
	});

	var FootballEventsView = EventsView.extend({
		initialize: function () {
			this.$el.empty(); //ON FIRST INITIALIZTION THIS WILL CLEAR BODY ELEMENT
			this.collection.bind('remove', this.deleteEvent, this); //LISTEN TO REMOVE EVENT AND CALL THE DELETEEVENT METHOD OF PARENT (EVENTSVIEW) CONSTRUCTOR
			this.collection.bind('add', this.addEvent, this); //LISTEN TO ADD EVENT AND CALL THE ADDEEVENT METHOD OF PARENT (EVENTSVIEW) CONSTRUCTOR
			this.renderAllEvents(); //PARENTS METHOD, RENDER ALL FOOTBALL EVENTS
		},

		render: function (event) { //FOR PARTITIAL RENDERING OF SINGLE MODEL IN COLLECTION
			var footballView = new FootballView({model: event}); //CREATE NEW FOOTBALL VIEW
			this.$el.append(footballView.render().el); //APPENDING RENDERED FOOTBALL EVENT ELEMENT TO BY ELEMENT
			return this; //THIS IS A GOOD PATTERN TO RETURN THIS IN RENDER METHOD
		}
	});
	return FootballEventsView;
});
