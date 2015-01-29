define([
  "lib/underscore",
  "lib/backbone",
  "providers/ddg/DDGCategoryProvider",
  "models/Provider",
	"models/ProviderEntry"
], function(
  _,
  Backbone,
  DDGCategoryProvider,
  Provider,
	ProviderEntry
) {

  var superInit= Provider.prototype.initialize;

  var FolderProvider= Provider.extend({

    initialize: function(model, path) {
      superInit.apply(this, arguments);

      this._path= path || "/explore/";
    },

    retrieve: function(filter) {
      var path= this._path;
      var result= $.Deferred();

      $.get(this._path)
        .done(function(response) {
          var files= response.map(function(file) {
            return file.isDirectory ?
                        new FolderProvider({ label: file.label }, path + "/" + file.label) :
                        new ProviderEntry({
                          label: file.label,
                          url: path + file
                        });
          }).filter(function(file) {
            return file.get("label").indexOf(filter) !== -1;
          });

          result.resolve(new Backbone.Collection(files));
        });

      return result;
    }
  });

  return FolderProvider;
});
