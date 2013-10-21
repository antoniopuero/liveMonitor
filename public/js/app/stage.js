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
			return maxSize;
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
		}
	};
	return LiveAPI;
});
