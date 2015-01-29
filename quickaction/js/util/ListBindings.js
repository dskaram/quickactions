define([], function(){

	return {

		bindWithAdapter: function(source, sink, adapter) {
			source.on("add", function() {
				sink.add(adapter(source));
			});

			source.on("remove", function(removed, collection, options) {
				sink.remove(sink.at(options.index));
			});
		}

	};
});