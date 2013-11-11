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
		renderHat: function () {
			var self = this;
			return templates.tennisHatTemplate({model: this.model.attributes, self: self});
		},
		renderScore: function (event_stat, status, timeToStart) {
			console.log(event_stat, status)
			if (status == 28) {
				templateEngine = templates.beforeScoreTemplate;
				return templateEngine({timeToStart: timeToStart});
			} else {
				templateEngine = templates.tennisScoreTemplate;
				return templateEngine(event_stat);
			}
		},
		renderSetBets: function (bettypes, status) {
			var self = this,
				setNum = this.getPeriod(status),
				setBetsGroups = [
					[5, 127],
					[20, 139],
					[124, 140],
					[125, 127]
				],
				setNames = ['першого', 'другого', 'третього', 'четвертого'],
				bets;
			if (setNum) {
				bets = setBetsGroups[setNum - 1];
				return bets ? templates.setTemplate({bettypes: bettypes, betsGroup: bets, self: self, setNum: setNum, setName: setNames[setNum - 1]}): '';
			} else {
				return '';
			}

		},
		getPeriod: function (status) {
			var setNames = ['перш', 'друг', 'трет', 'четв'],
				cur;
			_.each(setNames, function (namePart, index) {
				if (status.indexOf(namePart) !== -1) {
					cur = index + 1;
					return false;
				}
				return cur;
			});
		}
	});


	var TennisEventsView = EventsView.extend({
		initialize: function () {
			this.collection.bind('remove', this.deleteEvent, this);
			this.collection.bind('add', this.addEvent, this);
			this.renderAllEvents();
			this.resortByTime();
		},

		render: function (event) {
			var tennisView = new TennisView({model: event});
			this.$el.append(tennisView.render().el);
			return this;
		}
	});
	return TennisEventsView;
});
