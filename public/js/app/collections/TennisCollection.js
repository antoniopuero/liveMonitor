/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:33
 * To change this template use File | Settings | File Templates.
 */
define(['models/TennisEvent', 'collections/Events'], function (TennisEvent, Events) {
	var TennisCollection = Events.extend({
		model: TennisEvent,
		initialize: function () {
//			console.log('tennis collection');
		}
	});
	return TennisCollection;
});
