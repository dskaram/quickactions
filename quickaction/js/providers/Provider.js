define([
	"underscore",
	"providers/ProviderEntry"
], function(
	_,
	ProviderEntry
) {
  return ProviderEntry.extend({

  	isProvider: function() {
  		return true;
  	},

		adapter: function() {
			return _.identity;
		},

		debounced: function() {
			return false;
		},

		accepts: function(filter) {
			throw new Error("Must override accepts");
		},

    retrieve: function(filter) {
    	throw new Error("Must override retrieve");
    }

  });
});
