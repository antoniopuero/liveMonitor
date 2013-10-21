/**
 * Created with JetBrains PhpStorm.
 * User: a.savchenko
 * Date: 15.07.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
define(function () {
	var LiveAPI = {
		resizeFonts: function (blockGroup, maxSize) {
			var fontWidthCof = 1.1111111111111112,
				minBlockWidth = Infinity,
				maxTextLength = 0,
				tempCof;
			maxSize = maxSize ? maxSize : 25;
			blockGroup.each(function () {
				var $this = $(this),
					blockWidth = $this.width(),
					textLength = $this.text().length;
				if ((blockWidth != 0) &&  (blockWidth < minBlockWidth)) {
					minBlockWidth = blockWidth;
				}
				if ((textLength != 0) && (textLength > maxTextLength)) {
					maxTextLength = textLength;
				}
			});
			console.log(blockGroup, minBlockWidth, maxTextLength);
			tempCof = fontWidthCof * minBlockWidth / maxTextLength;
			maxSize = (maxSize < tempCof) ? maxSize : tempCof;
			return maxSize;
		}
	};
	return LiveAPI;
});
