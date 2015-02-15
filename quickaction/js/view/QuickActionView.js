define([
  "underscore",
  "backbone",
  "view/Keys",
  "view/Matcher",
  "view/Selection",
  "view/Navigation",
  "doT!view/templates/QuickActionView",
  "doT!view/templates/QuickActionList",
  "doT!view/templates/Breadcrumbs"
  ], function(
    _,
    Backbone,
    Keys,
    Matcher,
    Selection,
    Navigation,
    QuickActionViewTemplate,
    QuickActionListTemplate,
    Breadcrumbs
  ) {

  var TRANSITION_END= "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

  return Backbone.View.extend({

    KEY: "key-pressed",
    BACKSPACE: "backspace-pressed",
    SELECTION: "selection-pressed",
    NAVIGATION: "navigation-pressed",

    className: "main-container",

    events: {
      "keydown .input-view": "_onKeyDown",
      "keypress .input-view": "_onKeyPress",
      "mousemove .listEntries": "_onMouseMove",
      "click": "focus",
      "click .listEntry": "_onClick",
      "click .breadcrumb:not(.active)": "_targetBreadcrumb",
      "click .breadcrumbs .initial": "_targetBreadcrumb"
    },

    initialize: function(options) {
      this.layers= options.layers;

      var self= this;

      options.global.on("change:breadcrumb", function(model, breadcrumbs) {
        var node= self.$el.find(".breadcrumbs");
        node.html(Breadcrumbs(breadcrumbs));
        node.children().last().addClass("active");
      });

      this.layers.on("add", function(layer, collection, options) {
        var layerIndex= options.index;
        var layerContainer= $("<ul class='listEntries'></ul>");
        self.listView.append(layerContainer);

        layer.on("change:searchTerm", function(model, searchTerm) {
          self.inputBox.html(searchTerm);
        });

        layer.on("change:shown", function(model, shown) {
          var translation= -1 * (self.layers.length - 1 - layerIndex) * 100;
          layerContainer.css("transform", "translateX(" + translation + "%)");
        });

        layer.on("change:selection", function(model, index) {
          var entries= layerContainer.find(".listEntry");
          var selectedElement= entries.eq(index);

          entries.removeClass("selected");
          selectedElement.addClass("selected");
          selectedElement.scrollIntoViewIfNeeded();
        });

        layer.on("change:entries", function(model, entries) {
          var selection= model.get("selection");
          var filter= model.get("searchTerm");
          var adapter= model.get("searchAdapter");
          layerContainer.html(QuickActionListTemplate({
                entries: entries.map(function(entry) {
                          return {
                            label: Matcher.highlight(entry.get("label"), adapter(filter)),
                            isProvider: entry.isProvider()
                          };
                        }),
                selection: selection
          }));
        });
      });

      var pendingRemoval= []; // user might be navigating faster than the transform animation
      this.layers.on("remove", function() {
        var entries= self.listView.children();
        var removed= entries.eq(entries.length - pendingRemoval.length - 1);
        pendingRemoval.push(removed);

        removed.on(TRANSITION_END, function() {
          removed.remove();
          pendingRemoval = _.reject(pendingRemoval, function(el) { return el === removed; });

        });
        removed.css("transform", "translateX(" + 100 + "%)");
          // destroy all listeners
      });

    },

    render: function() {
      this.$el.html(QuickActionViewTemplate({}));

      this.inputBox= this.$el.find(".input-view");
      this.listView= this.$el.find(".list-view");
      return this;
    },

    focus: function() {
      this.$(".input-view").focus();
    },

    _onKeyDown: function(e) {
      switch(e.which) {
          case Keys.BACKSPACE:
              Keys.stopEvent(e);
              this.trigger(this.BACKSPACE);
              break;
          case Keys.UP_ARROW:
              Keys.stopEvent(e);
              this.trigger(this.SELECTION, Selection.UP);
              break;
          case Keys.DOWN_ARROW:
              Keys.stopEvent(e);
              this.trigger(this.SELECTION, Selection.DOWN);
              break;
          case Keys.ENTER:
            Keys.stopEvent(e);
            this.trigger(this.NAVIGATION, Navigation.EXECUTE);
            break;
          case Keys.RIGHT_ARROW:
            Keys.stopEvent(e);
            var activeLayer= this.layers.active();
            var isProvider= activeLayer.get("entries").at(activeLayer.get("selection")).isProvider();
            if (isProvider) {
              this.trigger(this.NAVIGATION, Navigation.EXECUTE);
            }
            break;
          case Keys.LEFT_ARROW:
              Keys.stopEvent(e);
              this.trigger(this.NAVIGATION, Navigation.ROLLBACK);
              break;
      }
    },

  	_onClick: function(e) {
      // do not stop propagation. parent needs to refocus
  		this.trigger(this.NAVIGATION, Navigation.EXECUTE);
  	},

    _targetBreadcrumb: function(e) {
      // do not stop propagation. parent needs to refocus
      this.layers.length > 1 && this.trigger(this.NAVIGATION, this.layers.length - $(e.target).index() - 1);
    },

  	_onMouseMove: function(e) {
  		Keys.stopEvent(e);
  		this.trigger(this.SELECTION, $(e.target).closest(".listEntry").index());
  	},

    _onKeyPress: function(e) {
      Keys.stopEvent(e);
      this.trigger(this.KEY, String.fromCharCode(e.which));
    }
  });
});
