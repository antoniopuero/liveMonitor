define(['stage'], function (LiveAPI) {
	var cometController = {

		init : function(){
			var self = this,
				address = location.search.split(':')[3],
				id = location.search.split(':')[4];
			if (id) {
				_self.LiveChannelID = id;
				_self.firstSteps();
				return false;
			}
			address = address ? address : '172.16.4.1';
			$.jsonp({
				url: 'http://' + address + '/param/LIVE_CHANNEL',
				callback: 'cometD_controller.setChannelId',
				callbackParameter: 'callback',
				error: function () {
					//console.error("ERROR!");
					self.firstSteps();
				}
			});
		},

		clientIP :  null,
		LiveChannelID: '',

		setChannelId: function (data) {
			this.LiveChannelID = data.liveid;
		},
		firstSteps: function () {
			var self = cometController;
//			jQuery.cometd.configure({url: "https://igra.msl.ua/cometd"});
			jQuery.cometd.configure({url: "http://10.0.0.171:8080/lbs/test/cometd"});
			jQuery.cometd.addListener('/meta/connect', self.connectionCallBackConnect);
			jQuery.cometd.addListener('/service/data', self.connectionCallBackServiceData);
			jQuery.cometd.registerExtension('lbs', self.LbsExtension());
			jQuery.cometd.disconnect();
			jQuery.cometd.handshake();				 /* HANDSHAKE */
		},

		getURL : function(){
			return '/lbs/test/cometd/'
		},

	    lbsExtOutgoing : function(message){
		    var self = cometController;
	        if (!message.ext){
	            message.ext = {};
	        }

	        if (cometD_controller.clientIP === null){
	            message.ext.lbs = {
	                soft_id: 'monitor'
	            }
	        }else {
	            message.ext.lbs = {
	                soft_id: LetLive._Reg_.clientType,
	                ip: self.clientIP
	            }
	        }
	    },

		lbsExtIncoming :function(message) {
			var self = cometController;

	        if (message.ext && message.ext.lbs && message.ext.lbs.ip && self.clientIP === null) {
	            self.clientIP = message.ext.lbs.ip;
	        }
	    },
		LbsExtension :function(){
			var self = cometController;

	        return {
			   outgoing:  self.lbsExtOutgoing,
	           incoming:  self.lbsExtIncoming
			}
	    },
		the_connectionProblems : false,

		connectionCallBackConnect : function(message){
			var self = cometController;

			if (message.successful) {
	            if(self.the_connectionProblems == true){
					 window.location.reload();
				}
	            window.PULSE = Math.round((new Date()).getTime() / 1000);
	        } else {
	            self.the_connectionProblems = true;
	        }

			if (self.disconnecting){
				self.connected = false;
				self.connectionClosed();

			} else {

				self.wasConnected = self.connected;
				self.connected = message.successful === true;
				if (!self.wasConnected && self.connected){
					self.theSubscribe('/data_o/event/*', 'useId');

				}else if (self.wasConnected && !self.connected){
					self.connectionBroken();
				}
			}
		},

		theSubscribe :  function(channel, useChannelId){
			if (useChannelId && this.LiveChannelID) {
				channel = channel.split('/');
				channel.splice(2, 0, this.LiveChannelID);
				channel = channel.join('/');
			}
			jQuery.cometd.subscribe(channel, this.updatesCallBack);
		},

		theUnSubscribe : function(channel){
			jQuery.cometd.unsubscribe(channel);
		},


		connectionCallBackServiceData : function(message){
			var self = cometController,
				data = message.data.response,
				information = data.data,
				correlation = {
					bettypes: function (information) {
						App.cond.bettypes = LiveAPI.convertArrayIntoObject(information, 'event_num');
						App.Vent.trigger('init:bets', information);
					},
					event: function (information) {
						App.cond.event = LiveAPI.convertArrayIntoObject(information, 'event_num');
						App.Vent.trigger('init:event', information);
						self.theSubscribe('/data_o/dictionary/ua');
					},
					event_stat: function (information) {
						App.cond.event_stat = LiveAPI.convertArrayIntoObject(information, 'event_num');
						App.Vent.trigger('init:stat', information);
						self.theSubscribe('/data_o/bettypes/*', 'useId');
					},
					dictionary: function (information) {
						App.cond.dictionary = LiveAPI.convertArrayIntoObject(information, 'event_num');
						App.Vent.trigger('init:dictionary', information);
						self.theSubscribe('/data_o/event_stat/*', 'useId');
					}
				};
			for (var messageType in information) {
				correlation[messageType](information[messageType]);
			};

		},
		updatesCallBack : function(message){
			var data = message.data.response,
				information = data.data,
				correlation = {
					bettypes: function (information) {
						App.Vent.trigger('update:bets', information);
					},
					event: function (information) {
						App.Vent.trigger('update:event', information);
					},
					event_stat: function (information) {
						App.Vent.trigger('update:stat', information);
					},
					dictionary: function (information) {
						App.Vent.trigger('update:dictionary', information);
					}
				};
			for (var messageType in information) {
				correlation[messageType](information[messageType]);
			}
		}
	};
	return cometController;
});
