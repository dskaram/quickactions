define([
  "lib/underscore",
  "lib/backbone",
  "models/Provider",
], function(
  _,
  Backbone,
  Provider,
) {

  var superInit= Provider.prototype.initialize;

  return Provider.extend({

    initialize: function(model, options) {
      superInit.apply(this, arguments);

      this._wrapped= wrapped;
    },

    retrieve: function(filter) {
      return this._wrapped.done(function(all) {
          all.filter(function(entry) {
              return entry.get("label").indexOf(filter) !== -1;          
          });
      });
    }
  });

});
