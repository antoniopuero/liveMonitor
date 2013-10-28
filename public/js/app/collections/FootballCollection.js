/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:34
 * To change this template use File | Settings | File Templates.
 */
define(['models/FootballEvent', 'collections/Events'], function (FootballEvent, Events) {
	var FootballCollection = Events.extend({
		model: FootballEvent,
		initialize: function () {
			console.log('football collection');
		}
	});
	return FootballCollection;
});
