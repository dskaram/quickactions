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

  return Provider.extend({

    initialize: function(props, topics) {
      Provider.prototype.initialize.apply(this, arguments);
      this.topics= topics;
    },

    retrieve: function(filter) {
      return $.Deferred()
                      .resolve(new Backbone.Collection(
                        _.map(this.topics, function(topic) {
                          return new ProviderEntry({
                            label: topic.Text,
                            url: topic.FirstUrl
                          });
                        })
                      ));
    }
  });
});
