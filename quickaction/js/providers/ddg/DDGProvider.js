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

  var directResults= function(response) {
    var results= _.filter(response, function(entry) {
      return entry.Text;
    });

    return _.map(results, function(result) {
      return new ProviderEntry({
        label: result.Text,
        url: result.FirstURL
      });
    });
  };

  var groupedResults= function(response) {
    var results= _.filter(response, function(entry) {
      return entry.Name;
    });

    return _.map(results, function(result) {
      return new DDGCategoryProvider({ label: result.Name }, result.Topics);
    });
  };

  return Provider.extend({

    retrieve: function(filter) {
      var result= $.Deferred();
      var ddgQuery= "http://api.duckduckgo.com/?q=" + filter + "&format=json";

      $.get(ddgQuery,function(j) {},'jsonp')
        .done(function(response) {
          response= response.RelatedTopics;
          var direct= directResults(response);
          var groups= groupedResults(response);

          result.resolve(new Backbone.Collection(direct.concat(groups)));
        });

      return result;
    }

  });
});