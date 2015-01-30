define([
  "underscore",
  "backbone",
  "models/Provider",
	"models/ProviderEntry"
], function(
  _,
  Backbone,
  Provider,
  ProviderEntry
) {

  var superInit= Provider.prototype.initialize;

  return Provider.extend({

    initialize: function(props, topics) {
      superInit.apply(this, arguments);
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