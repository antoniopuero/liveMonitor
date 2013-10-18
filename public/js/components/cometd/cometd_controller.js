

define(function () {
	var cometController = {

		init : function(){
			var self = cometController;
	//		jQuery.cometd.configure({url: LetLive._Helper_.parseUrl('comet') /*,advice: {interval:5000},logLevel: 'debug'*/});
			jQuery.cometd.configure({url: "http://10.0.0.171:8080/lbs/test/cometd"  /*,logLevel: 'debug'*/});
			jQuery.cometd.addListener('/meta/connect', self.connectionCallBackConnect);
			jQuery.cometd.addListener('/service/data', self.connectionCallBackServiceData);
			jQuery.cometd.registerExtension('lbs', self.LbsExtension());
			jQuery.cometd.disconnect();
			jQuery.cometd.handshake();
		},

		clientIP :  null,

		getURL : function(){
			return '/lcbs/test/cometd/'
		},

	    lbsExtOutgoing : function(message){
	        if (!message.ext){
	            message.ext = {};
	        }

	        if (cometD_controller.clientIP === null){
	            message.ext.lbs = {
	                soft_id: LetLive._Reg_.clientType
	            }
	        }else {
	            message.ext.lbs = {
	                soft_id: LetLive._Reg_.clientType,
	                ip: cometD_controller.clientIP
	            }
	        }
	    },

		lbsExtIncoming :function(message) {

	        if (message.ext && message.ext.lbs && message.ext.lbs.ip && cometD_controller.clientIP === null) {
	            cometD_controller.clientIP = message.ext.lbs.ip;
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
					self.theSubscribe('/data_o/event/*');

				}else if (self.wasConnected && !self.connected){
					self.connectionBroken();
				}
			}
		},

		theSubscribe :  function(channel){
			jQuery.cometd.subscribe(channel, cometController.updatesCallBack);
		},

		theUnSubscribe : function(channel){
			jQuery.cometd.unsubscribe(channel);
		},


		connectionCallBackServiceData : function(message){
			var self = cometController,
				data = message.data.response,
				information = data.data;
			for (var messageType in data.data); //for string value of type

			switch(messageType){
				case 'event':
					App.Vent.trigger('init:event', information);
					self.theSubscribe('/data_o/dictionary/ua');
					break;
				case 'dictionary':
					App.Vent.trigger('init:dictionary', information);
					self.theSubscribe('/data_o/event_stat/*');

					break;
				case 'event_stat':
					App.Vent.trigger('init:stat', information);
					self.theSubscribe('/data_o/bettypes/*');
					break;
				case 'bettypes':
					App.Vent.trigger('init:bets', information);
					break;
			}

		},
		updatesCallBack : function(message){
			var data = message.data.response,
				information = data.data;
			for (var messageType in data.data);
			switch(messageType){
				case 'bettypes':
					App.Vent.trigger('update:bets', information);
					break;
				case 'event':
					App.Vent.trigger('update:event', information);
					break;
				case 'event_stat':
					App.Vent.trigger('update:stat', information);
					break;
				case 'dictionary':
					App.Vent.trigger('update:dictionary', information);
					break;
			}
		}
	};
	return cometController;
});
