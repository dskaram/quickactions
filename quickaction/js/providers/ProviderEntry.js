define([
	"backbone"
], function(
	Backbone
) {
  return Backbone.Model.extend({

  	isProvider: function() {
  		return false;
  	},

		execute: function() {
			var url= this.get("url");
			if (!url) {
				throw new Error("URL needed to attach default behavior.");
			}

			window.open(url, "_blank");
		}

  });
});
