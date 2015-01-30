define([
	"backbone"
], function(
	Backbone
) {
  return Backbone.Model.extend({

  	isProvider: function() {
  		return false;
  	}

  });
});
