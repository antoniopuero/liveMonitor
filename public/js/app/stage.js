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
				if ((blockWidth != 0) &&  (blockWidth < minBlockWidth)) {
					minBlockWidth = blockWidth;
				}
				if (textLength > maxTextLength) {
					maxTextLength = textLength;
				}
			});
			tempCof = Math.floor(fontWidthCof * minBlockWidth / maxTextLength);
			if (tempCof < minSize) {
				maxSize = minSize;
			} else if (tempCof > maxSize) {
				maxSize = maxSize;
			} else {
				maxSize = tempCof;
			}
			return maxSize + 1;
		},

		useResizedFonts: function (selectors, styleContainer) {
			var style = '';
			_.each(selectors, function(sizes, selector) {
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
				eventCount = Math.floor(viewPortHeight/height),
				possibleHeight = Math.floor(viewPortHeight / eventCount);
			styleContainer.text(eventSelector + ' {height: ' +  possibleHeight + 'px;}');
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
			var completeEvents = [];
			_.each(condObj.event, function (value, key) {
				if (condObj.bettypes[key] && condObj.event_stat[key]) {
					completeEvents.push({
						event_num: key,
						event: condObj.event[key],
						bettypes: condObj.bettypes[key],
						event_stat: condObj.event_stat[key]
					});
					delete condObj.event[key];
					delete condObj.bettypes[key];
					delete condObj.event_stat[key];

				}
			});
			return completeEvents;
		},

		checkFullEvent: function (condObj, portion, name) {
			var names = ['event', 'event_stat', 'bettypes'],
				i = _.indexOf(names, name),
				isFull = true,
				ev_num = portion['event_num'];
			names.splice(i, 1);
			if (_.some(condObj.completeEvents, function (eventObject) {
				return ev_num === eventObject[event_num];
			})) {
				return isFull //true
			} else {
				_.each(names, function (name) {
					if (!condObj[name][ev_num]) {
						isFull = false;
					}
				});
				return isFull;
			}
		},
		getFromDictionary: function(code, marker, type) {  /* get name from dictionary using code */
			var name = '',
				accord = false,
				type = type || 'name',
				dict = App.cond.dictionary,
				i, j;
			for(i in dict) {
				if (accord === false) {
					if (dict[i][0].hasOwnProperty(marker)) {
						for (j in dict[i][0][marker]) {
							if(accord === false){
								if (dict[i][0][marker][j].code == code) {
									name = dict[i][0][marker][j][type];
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
		startTime: function (startTime) {
			var start = new Date(parseInt(startTime, 10) * 1000),
				startString = '';
			startString += start.getDay() + '.' + (start.getMonth() + 1) + ', ' + start.getHours() + ':' + start.getMinutes();
			return startString;
		},
		preCompile: function (eventObj) {
			var self = LiveAPI,
				competitors = eventObj.event.competitors;
			competitors.home.name = self.getCompetiotorName(competitors.home.code);
			competitors.away.name = self.getCompetiotorName(competitors.away.code);
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
			tempTime = start.getDay() - now.getDay();
			if (tempTime > 0) {
				timeToStartString += tempTime + "д";
			}
			tempTime = start.getHours() - now.getHours();
			if (tempTime > 0) {
				timeToStartString += tempTime + "г";
			}
			tempTime = start.getMinutes() - now.getMinutes();
			if (tempTime > 0) {
				timeToStartString += tempTime + "хв";
			}
			return timeToStartString;
		}
	};
	return LiveAPI;
});
