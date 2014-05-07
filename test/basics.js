(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'jquery-prefixed-data',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(JqueryPrefixedData, should) {
	'use strict';

	describe('JqueryPrefixedData basics', function () {
		beforeEach(function (done) {

			var html = [
				'<div ',
					'id="test-div"',

					'data-arch-require-module1="path/to/module/1"',
					'data-arch-require-module2="path/to/module/2"',

					'data-arch-module1-color="red"',
					'data-arch-module1-size="s"',
					'data-arch-module1-el="this"',

					'data-arch-module2="this"',
				'>',
				'</div>'
			].join('');

			this.$html = $(html).appendTo($('body'));

			done();
		});

		it('no prefix', function () {

			this.$html
				.prefixedData()
					.should.have.property('archRequireModule1');
		});

		it('single prefix', function () {

			this.$html
				.prefixedData('arch')
					.should.have.property('requireModule1');
		});

		it('complex prefix', function () {

			this.$html
				.prefixedData('archRequire')
					.should.eql({
						module1: "path/to/module/1",
						module2: "path/to/module/2"
					});

			this.$html
				.prefixedData('archModule1')
				.should.eql({
					color: 'red',
					size: 's',
					el: 'this'
				});

			this.$html
				.prefixedData('archModule2')
				.should.eql({});
		});
	});
});
