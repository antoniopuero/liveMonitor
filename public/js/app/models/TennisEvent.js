/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:34
 * To change this template use File | Settings | File Templates.
 */
define(['models/Event'], function (Event) {
	var TennisEvent = Event.extend({
		initialize: function () {
//			console.log('tennis event');
		}
	});
	return TennisEvent;
});
