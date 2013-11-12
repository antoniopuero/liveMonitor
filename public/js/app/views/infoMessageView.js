/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 12.11.13
 * Time: 15:58
 * To change this template use File | Settings | File Templates.
 */

define(['templates', 'backbone'], function (templates, Backbone) {

	var infomessageView = Backbone.View.extend({
		className: 'container-fluid info-message', //THIS WILL BE A DIV ELEMENT WITH SPECIFIED CLASSES
		template: templates.infoMessageTemplate, //UNDERSCORE PRETEMPLATES
		initialize: function () { //CALL ON INITIALIZTION
			App.Vent.on('infomessage', this.render, this); //SUBSCRIBE TO INFOMESSAGE EVENT FROM ALL THE ENDS OF THE LIVE APPLICATION
			App.Vent.on('infomessage:hide', this.hide, this); //SUBSCRIBE TO INFOMESSAGE:HIDE AND HIDE THE MESSAGE WHEN FIRE
		},
		hide: function () {
			this.$el.detach(); //DETACH FOR NEXT USING
		},
		render: function (messageType) {
			var message = ({
				'no_evs': 'Немає подій',
				'bad_connect': 'Проблеми з\'єднання',
				'loading': 'Триває завантаження'
			})[messageType], //THREE INFO MESSAGES
				loading = messageType == 'loading' ? true : false; //FOR LOADING GIF IN TEMPLATE
			this.$el.empty(); //EMPTY CONTAINER DIV ELEMENT
			this.$el.html(this.template({message: message, loading: loading})); //RENDER TEMPLATE AND APPEND IT TO CAONTAINER
			this.$el.appendTo($('body')); //APPEND INFOMESSAGE VIEW INTO THE BODY ELEMENT
		}
	});

	return infomessageView;
});
