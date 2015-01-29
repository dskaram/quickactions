define([
	"models/ProviderEntry"
], function(
	ProviderEntry
) {
  return ProviderEntry.extend({

  	isProvider: function() {
  		return true;
  	},

    retrieve: function(filter) {
    	throw new Error("Must override provider");
    }

  });
});