/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 28.10.13
 * Time: 9:45
 * To change this template use File | Settings | File Templates.
 */
define(['backbone'], function (Backbone) {


	var EventView = Backbone.View.extend({
		className: 'event-wrapper',
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	return EventView;
});
