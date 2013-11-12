/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	var LiveAPI = {
	availableSports: {
		1: 'football',
		3: 'tennis'
	},
	/**
	 * resizeFonts used for a responsive design of monitors
	 * @param {array} blockGroup - jQuery object which provide elements of one group for resizing font
	 * @param {number} maxSize - the limitation of maximum size of font in block group
	 * @param {number} minSize - the limitation of minimum size of font in block group
	 * @return {number} maxSize - max size of font for non-breaking elements in group
	 */
		resizeFonts: function (blockGroup, maxSize, minSize, doubleWidth) {
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

			if (doubleWidth !== undefined) {
				tempCof *= 2;
			}
			if ( tempCof < minSize ) {
				maxSize = minSize;
			} else if ( tempCof > maxSize ) {
				maxSize = maxSize;
			} else {
				maxSize = tempCof;
			}
			return maxSize;
		},

		/**
		 * useResizedFonts - decorator function for resizeFonts
		 * @param {object} selectors - object, where key is selector string and value is an array [minSize, maxSize]
		 * @param {array} styleContainer - jQuery object of style tag, which will contain style rules for font sizes
		 */
		useResizedFonts: function (selectors, styleContainer) {
			var style = '';
			_.each(selectors, function (sizes, selector) {
				style += selector + ' {font-size:' + LiveAPI.resizeFonts($(selector), sizes[1], sizes[0], sizes[2]) + 'px; }\n';
			});
			styleContainer.text(style);
		},

		/**
		 * setColumn - function for initial adding a column-count rule, based on parameter in location.search string after ':' character
		 * @param {array} el - jQuery object of el, for which will be applied styles
		 */
		setColumns: function (el) {
			var cloumnCount = location.search.split(':')[1];
			el.css({
				'-webkit-column-count': cloumnCount,
				'column-count': cloumnCount
			});
		},

		/** converts array into object
		 * @param {array} array - array of objects which will be convert into object
		 * @param {string} param - key in object, value of which will be a new key in returned object
		 * @return {object} resultObj - new object of objects
		 */
		convertArrayIntoObject: function (array, param) {
			var resultObj = {};
			_.each(array, function (value) {
				var key = value[param];
				resultObj[key] = value;
			});
			return resultObj;
		},

		/**
		 * @param {array} array - array of objects which will be convert into object
		 * @param {string} param - key in object, value of which will be a new key in returned object
		 * @return {object} resultObj - new object of objects
		 */
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
			event.display_status = self.getStatusFromDictionary(event.status_code);
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
				return ev_num === eventObject['event_num'];
			}) ) {
				return isFull; //true
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
				//these are bettypes
				sortedMarkets = {};
			if (!aBettypes) {
				return false;
			}
			_.each(aBettypes, function (bettypePortion) {
				var type = bettypePortion.type,
					result;
				//sort markets to correct bettypes
				if ( !sortedMarkets[type] ) {
					sortedMarkets[type] = {
						name: self.getBettypeName(type),
						markets: {},
						status: 'blocked'
					};
				}
				//if one of markets is open - then bettype is open too
				result = self.sortOdds(bettypePortion.odds);
				//value of market (hardcode)
				bettypePortion.value = result.value;
				//oddds of market
				bettypePortion.odds = result.odds;
				if (bettypePortion.status == "open") {
					sortedMarkets[type].status = 'open';
				}
				//for markets type in bettype
				sortedMarkets[type].markets[bettypePortion.market] = bettypePortion;
			});
			//sort markets by value
			_.each(sortedMarkets, function (bettype) {
				bettype.markets = _.sortBy(bettype.markets, function (market) {
					return market.value;
				});
			});

			return sortedMarkets;
		},
		sortOdds: function (aOdds) {
			var self = LiveAPI,
				oOdds = {},
				value = '',
				result = {};
			_.each(aOdds, function (odd) {
				odd.change = '';
				odd.outcome = self.getOutcomeName(odd.outcome_code);
				oOdds[odd.code] = odd;
				value = odd.values.join('');
			});
			if (value) {
				result.value = parseFloat(value);
			}
			result.odds = oOdds;
			return result; // {odds: '...', value: '...'}
		},

		getStatusFromDictionary: function (code) {
			return LiveAPI.getFromDictionary(code, 'match_status');
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

		startTime: function (startTime) {
			var start = new Date(parseInt(startTime, 10) * 1000),
				startString = '';
			startString += start.getDate() + '.' + (start.getMonth() + 1) + ', ' + start.getHours() + ':' + (start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes());
			return startString;
		},

		timeToStart: function (startTime) {
			var start = new Date(parseInt(startTime, 10) * 1000),
				now = new Date(),
				tempTime,
				timeToStartString = 'До початку: ';
			if (start - now < 0) {
				return '';
			}
			tempTime = start.getDate() - now.getDate();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "д ";
			}
			tempTime = start.getHours() - now.getHours();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "г ";
			}
			tempTime = start.getMinutes() - now.getMinutes();
			if ( tempTime > 0 ) {
				timeToStartString += tempTime + "хв";
			}
			return timeToStartString;
		},
		updateRouter: function (data, dataType, updateMethod) {
			var sportType = LiveAPI.availableSports[data.category_code],
				eventModel;

			if (!sportType) {
				_.each(App.cond.eventCollection, function (sportCollection) {
					eventModel = sportCollection.get(data.event_num);
					if (eventModel) {
						return false;
					}
				});
			} else {
				eventModel = App.cond.eventCollection[sportType].get(data.event_num);
			}

			if (eventModel) {
				updateMethod(eventModel, data);
			} else {

				if (dataType === 'bettypes') {
					App.cond[dataType][data.event_num] = LiveAPI.addNewBettypes(App.cond[dataType][data.event_num], data);
				} else {
					App.cond[dataType][data.event_num] = data;
				}

				if (LiveAPI.checkFullEvent(App.cond, data, dataType) && App.afterInit) {
					sportType = sportType ? sportType : LiveAPI.availableSports[App.cond.event[data.event_num].category_code];
					App.cond.eventCollection[sportType].add(LiveAPI.compileEvent(data.event_num, App.cond.event[data.event_num], App.cond.bettypes[data.event_num], App.cond.event_stat[data.event_num]));
				}
			}
		},
		updateEvent: function (eventModel, updatedEvent) {
			var event = eventModel.get('event');
			event.betstatus = updatedEvent.betstatus;
			if (_.indexOf(['closed', 'removed'], updatedEvent.status) !== -1) {
				setTimeout(function () {
					eventModel.collection.remove(eventModel.get('event_num'));
				}, 5 * 60 * 1000);
			}
			event.display_status = LiveAPI.getStatusFromDictionary(updatedEvent.status_code);
			eventModel.set({event: event});
		},
		updateEventStat: function (eventModel,updatedEventStat) {
			eventModel.set({event_stat: updatedEventStat});
		},
		addNewBettypes: function (bettypes, updatedBettypes) {
			var newBettypes = LiveAPI.sortBettypes(updatedBettypes.data),
				temp;
			if (!newBettypes) {
				return false;
			}
			_.each(newBettypes, function (bettype, type) {
				if (bettypes[type]) {


					bettypes[type].status = newBettypes[type].status;
					temp = bettypes[type].markets;
					_.each(newBettypes[type].markets, function (market, marketCode) {
						var marketStatus = '';
						if (temp[marketCode]) {

							console.log('existing market');

							marketStatus = newBettypes[type].markets[marketCode].status;
							if (_.indexOf(['closed', 'removed'], marketStatus) !== -1) {
								delete temp[marketCode];
							} else {
								temp[marketCode].status = marketStatus;
								temp = temp[marketCode].odds;
								_.each(newBettypes[type].markets[marketCode].odds, function (odd, oddCode) {
									var oddStatus = odd.status,
										oldCoef, newCoef;
									if (temp[oddCode]) {

										console.log('existing odd');

										if (_.indexOf(['closed', 'removed'], oddStatus) !== -1) {
											delete temp[oddCode];
										} else {
											console.log(temp[oddCode], odd)
											oldCoef = parseFloat(temp[oddCode].coef);
											newCoef = parseFloat(odd.coef);
											if (newCoef > oldCoef) {
												odd.change = 'up';
											} else if (oldCoef > newCoef) {
												odd.change = 'down';
											} else {
												odd.change = '';
											}
											temp[oddCode] = odd;

											console.log(temp[oddCode]);
										}
									} else if (_.indexOf(['closed', 'removed'], odd.status) === -1) {
										temp[oddCode] = odd;

										console.log('add new odd');

									}
								});
							}
						} else if (_.indexOf(['closed', 'removed'], market.status) === -1) {
							temp[marketCode] = market;

							console.log('add new market');

						}
					});
				} else {

					bettypes[type] = bettype;

					console.log('add new bettype');
				}
			});

			console.log('here bets');

			return bettypes;
		},
		updateBettypes: function (eventModel, updatedBettypes) {
			var oldBettypes = eventModel.get('bettypes'),
				newBettypes = LiveAPI.addNewBettypes(oldBettypes, updatedBettypes);
			if (newBettypes) {
				eventModel.set({bettypes: newBettypes});
			} else {
				return false;
			}
		}
	};
	return LiveAPI;
});
