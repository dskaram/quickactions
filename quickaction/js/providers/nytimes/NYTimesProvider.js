define([
  "underscore",
  "backbone",
  "providers/Provider",
	"providers/ProviderEntry"
], function(
  _,
  Backbone,
  Provider,
	ProviderEntry
) {

  var ACTIVATOR= "nyt ";
  var ADAPTER= function(filter) {
    return filter.substring(ACTIVATOR.length);
  };

  var API_KEY= "9291baaa0739ee49a814e81549255348:13:65897916";

  return Provider.extend({

    debounced: function() {
      return true;
    },

    adapter: function() {
      return ADAPTER;
    },

    accepts: function(filter) {
      return filter.indexOf(ACTIVATOR) === 0;
    },

    icon: function() {
      return "nyt-provider";
    },

    retrieve: function(filter) {
      filter= ADAPTER(filter);
      var result= $.Deferred();

      if (!filter) {

      }

      var nytQuery= "//api.nytimes.com/svc/search/v2/articlesearch.json?q=" + filter + "&sort=newest&api-key=" + API_KEY;

      $.get(nytQuery,function(j) {},'jsonp')
        .done(function(response) {
          result.resolve(new Backbone.Collection(
                              _.map(response.response.docs, function(result) {
                                return new ProviderEntry({
                                  label: result.headline.main,
                                  url: result.web_url
                                });
                              })
                            )
                          );
            });

      return result;
    }

  });
});
