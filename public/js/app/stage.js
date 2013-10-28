/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	var LiveAPI = {
		resizeFonts: function (blockGroup, maxSize, minSize) {
			var fontWidthCof = 1.3,
				minBlockWidth = Infinity,
				maxTextLength = 0,
				tempCof;
			maxSize = maxSize ? maxSize : 25;
			minSize = minSize ? minSize : 8;
			blockGroup.each(function () {
				var $this = $(this),
					blockWidth = $this.width(),
					textLength = $this.text().replace(/\s{2,}/g, '').length;
				if ( (blockWidth != 0) && (blockWidth < minBlockWidth) ) {
					minBlockWidth = blockWidth;
				}
				if ( textLength > maxTextLength ) {
					maxTextLength = textLength;
				}
			});
			tempCof = Math.floor(fontWidthCof * minBlockWidth / maxTextLength);
			if ( tempCof < minSize ) {
				maxSize = minSize;
			} else if ( tempCof > maxSize ) {
				maxSize = maxSize;
			} else {
				maxSize = tempCof;
			}
			return maxSize + 1;
		},

		useResizedFonts: function (selectors, styleContainer) {
			var style = '';
			_.each(selectors, function (sizes, selector) {
				style += selector + ' {font-size:' + LiveAPI.resizeFonts($(selector), sizes[1], sizes[0]) + 'px; }\n';
			});
			styleContainer.text(style);
		},

		setColumns: function (el) {
			var cloumnCount = location.search.split(':')[1];
			el.css({
				'-webkit-column-count': cloumnCount,
				'column-count': cloumnCount
			});
		},

		changeEventHeight: function (eventSelector, styleContainer) {
			styleContainer.text();
			var events = $(eventSelector),
				height = events.height(),
				viewPortHeight = $('html').height(),
				eventCount = Math.floor(viewPortHeight / height),
				possibleHeight = Math.floor(viewPortHeight / eventCount);
			styleContainer.text(eventSelector + ' {height: ' + possibleHeight + 'px;}');
		},

		convertArrayIntoObject: function (array, param) {
			var resultObj = {};
			_.each(array, function (value) {
				var key = value[param];
				resultObj[key] = value;
			});
			return resultObj;
		},

		checkCompleteEvents: function (condObj) {
			var self = LiveAPI,
				completeEvents = {
				football: [],
				tennis: []
			};
			_.each(condObj.event, function (event, key) {
				if ( condObj.bettypes[key] && condObj.event_stat[key] ) {
					if ( event.category_code === 1 ) {
						completeEvents.football.push(self.compileEvent(key, condObj.event[key], condObj.bettypes[key].data, condObj.event_stat[key]));
					} else if ( event.category_code === 3 ) {
						completeEvents.tennis.push(self.compileEvent(key, condObj.event[key], condObj.bettypes[key].data, condObj.event_stat[key]));
					}
					delete condObj.event[key];
					delete condObj.bettypes[key];
					delete condObj.event_stat[key];

				}
			});
			return completeEvents;
		},
		compileEvent: function (event_num, event, bettypes, event_stat) {
			console.log(arguments)
			var self = LiveAPI,
				compiledEvent = {
				event_num: event_num,
				bettypes: self.sortBettypes(bettypes),
				event_stat: event_stat
				},
				home = event.competitors.home,
				away = event.competitors.away;
			home.name = self.getCompetiotorName(home.code);
			away.name = self.getCompetiotorName(away.code);
			if (event.pairs) {
				home.name += ", " + self.getCompetiotorName(event.competitors.second_home.code);
				away.name += ", " + self.getCompetiotorName(event.competitors.second_away.code);
			}
			event.status = self.getStatusFromDictionary(event.status_code);
			event.starttime = self.startTime(event.start_time);
			event.time_to_start = self.timeToStart(event.start_time);

			compiledEvent.event = event;

			return compiledEvent;
		},

		checkFullEvent: function (condObj, portion, name) {
			var names = ['event', 'event_stat', 'bettypes'],
				i = _.indexOf(names, name),
				isFull = true,
				ev_num = portion['event_num'];
			names.splice(i, 1);
			if ( _.some(condObj.completeEvents, function (eventObject) {
				return ev_num === eventObject[event_num];
			}) ) {
				return isFull //true
			} else {
				_.each(names, function (name) {
					if ( !condObj[name][ev_num] ) {
						isFull = false;
					}
				});
				return isFull;
			}
		},
		getFromDictionary: function (code, marker, type) {  /* get name from dictionary using code */
			var name = '',
				accord = false,
				type = type || 'name',
				dict = App.cond.dictionary,
				i, j;
			for ( i in dict ) {
				if ( accord === false ) {
					if ( dict[i].hasOwnProperty(marker) ) {
						for ( j in dict[i][marker] ) {
							if ( accord === false ) {
								if ( dict[i][marker][j].code == code ) {
									name = dict[i][marker][j][type];
									accord = true;
								}
							}
						}
					} else {
						name = '';
					}
				}
			}
			return name;
		},
		sortBettypes: function (aBettypes) {
			var self = LiveAPI,
				sortedMarkets = {};
			_.each(aBettypes, function (bettypePortion) {
				var type = bettypePortion.type;
				if ( !sortedMarkets[type] ) {
					sortedMarkets[type] = {
						name: self.getBettypeName(type)
					};
				}
				bettypePortion.odds = self.sortOdds(bettypePortion.odds);
				sortedMarkets[type][bettypePortion.market] = bettypePortion;
			});
			return sortedMarkets;
		},
		sortOdds: function (aOdds) {
			var self = LiveAPI,
				sortedOdds = {};
			_.each(aOdds, function (odd) {
				odd.outcome = self.getOutcomeName(odd.outcome_code);
				sortedOdds[odd.code] = odd;
			});
			return sortedOdds;
		},
		startTime: function (startTime) {
			var start = new Date(parseInt(startTime, 10) * 1000),
				startString = '';
			startString += start.getDate() + '.' + (start.getMonth() + 1) + ', ' + start.getHours() + ':' + start.getMinutes();
			return startString;
		},

		getStatusFromDictionary: function (code) {
			return LiveAPI.getFromDictionary(code, 'match_status');
		},

		getCategoryName: function (code) {
			return LiveAPI.getFromDictionary(code, 'category');
		},

		getCompetiotorName: function (code) {
			return LiveAPI.getFromDictionary(code, 'team');
		},

		getOutcomeName: function (code) {
			return LiveAPI.getFromDictionary(code, 'outcome');
		},

		getBettypeName: function (code) {
			return LiveAPI.getFromDictionary(code, 'bettype');
		},

		timeToStart: function (startTime) {
			var start = new Date(parseInt(startTime, 10) * 1000),
				now = new Date(),
				tempTime,
				timeToStartString = '';
			tempTime = start.getDate() - now.getDate();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "д";
			}
			tempTime = start.getHours() - now.getHours();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "г";
			}
			tempTime = start.getMinutes() - now.getMinutes();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "хв";
			}
			return timeToStartString;
		}
	};
	return LiveAPI;
});
