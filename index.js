var postcss = require('postcss');

function getDefaultImage(images) {
	return images.match(/url\(.+?\)/)[0];
}

module.exports = postcss.plugin('postcss-image-set', function(opts) {
	opts = opts || {};

	return function(css) {
		css.walkRules(function(rule) {
			rule.walkDecls(function(decl, i) {
				if (!decl.value || decl.value.indexOf('image-set') === -1) {
					return;
				}

				var image = getDefaultImage(decl.value);
				decl.cloneBefore({
					prop: 'background-image',
					value: image
				});
			});
		});
	};
});

