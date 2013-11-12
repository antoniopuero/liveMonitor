/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:42
 * To change this template use File | Settings | File Templates.
 */
define(['templates', 'views/singleView', 'views/collectionView'], function (templates, EventView, EventsView) {

	var TennisView = EventView.extend({
		template: templates.tennisTemplate, //TENNIS TEMPLATE WITH FIXED BETTYPES POSITIONS

		renderScore: function (event_stat, status, timeToStart) { //FOR RENDERING SCORE BLOCK
			if (status == 'not_started') { //WHEN NOTHING TO RENDER - RENDER A BLOCK WITH TIME_TO_START PARAMETER
				return templates.beforeScoreTemplate({time: timeToStart}); //USE BEFORESCORETEMPLATE TO DO THIS
			} else { //AND WHEN THERE IS SOMETHING TO RENDER - RENDER A SCORE BLOCK
				return templates.tennisScoreTemplate(event_stat); //USE TENNISSCORETEMPLATE AND PASS EVENT_STAT OBJECT TO IT
			}
		},
		renderSetBets: function (bettypes, status, betstatus) { //RENDER SET BLOCK
			var self = this,
				setNum = self.getPeriod(status), //BY PARSING A STATUS STRING CHECK THE SETNUM
				setBetsGroups = [ //ARRAY OF ARRAYS OF SETS BETTYPES [MAIN, TOTAL_4ET/NE4ET, TOTAL_SETA]
					[5, 127, 134],
					[20, 139, 135],
					[124, 140, 136],
					[125, 141, 137],
					['none', 142, 138] //IF NONE - TEMPLATE DOESNT RENDER THIS BETTYPE BLOCK
				],
				setNames = ['першого', 'другого', 'третього', 'четвертого', 'пятого'], //UKRAINIAN BETTYPES CAPTIONS
				bets;
			if (setNum) {
				bets = setBetsGroups[setNum - 1]; //ZERO-BASED ARRAY, THAT'S WHY - 1
				return bets ? templates.setTemplate({bettypes: bettypes, betsGroup: bets, self: self, setNum: setNum, setName: setNames[setNum - 1], betstatus: betstatus}) : '';
			} else {
				return '';
			}

		},
		getPeriod: function (status) { //FOR PARSING A STATUS STRING OF TENNIS EVENT
			var cur  = /\d/.exec(status);
			if (cur) { //IF CUR !== NULL
				return cur[0];
			} else {
				return false;
			}
		}
	});

	var TennisEventsView = EventsView.extend({

		initialize: function () {
			this.collection.bind('remove', this.deleteEvent, this); //LIKE IN FOTTBALL COLLECTION VIEW
			this.collection.bind('add', this.addEvent, this); //AND ALSO
			this.renderAllEvents(); //AND THIS ONE
			this.resortByTime(); //TENNIS MUST BE RENDERED LAST AND THIS METHOD WILL DO ITS WORK CORRECTLY
			if (!this.checkEvents()) { //IN NO ONE EVENT IN LAYOUT
				App.Vent.trigger('infomessage', 'no_evs'); //FIRE INFOMESSAGE TO USER
			}
		},

		render: function (event) { //RENDER SINGLE MODEL VIEW IN COLLECTION
			var tennisView = new TennisView({model: event});
			this.$el.append(tennisView.render().el); //AND APPENT IN TO THE BODY ELEMENT
			return this;
		}
	});
	return TennisEventsView;
});
