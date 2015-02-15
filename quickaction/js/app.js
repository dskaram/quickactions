require.config({
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'doTCompiler': "lib/doTCompiler",
    'text':  'lib/text',
    'doT': 'lib/doT'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    }
  }
});

require(
  ["jquery",
    "underscore",
    "backbone",
    "util/ScrollIntoView",
    "providers/matching/MatchingProvider",
    "providers/ddg/DDGProvider",
    "providers/fs/FolderProvider",
    "QuickAction"
  ],
  function($, _, B, SIV, MatchingProvider, DDGProvider, FolderProvider, QuickAction) {
    $(function() {
      QuickAction
        .create($("#demo"))
        .provider(new MatchingProvider()
                        .add(new DDGProvider())
                        .add(new FolderProvider())
                  )
        .bind();
        ;
    });
  }
);
