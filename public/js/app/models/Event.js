/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 22.10.13
 * Time: 10:13
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	var Event = Backbone.Model.extend({
		initialize: function () {
			this.on('change', function (model) {
				console.log(model)
			});
		}
	});
	return Event;
});
