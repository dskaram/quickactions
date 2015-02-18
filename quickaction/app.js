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
    "providers/feedzilla/FeedZillaCategoryProvider",
    "providers/fs/FolderProvider",
    "providers/nytimes/NYTimesProvider",
    "QuickAction"
  ],
  function($, _, B, SIV,
          MatchingProvider,
          DDGProvider,
          FeedZillaCategoryProvider,
          FolderProvider,
          NYTimesProvider,
          QuickAction
  ) {
    $(function() {
      QuickAction
        .create($("#demo"))
        .baseUrl("/")
        .provider(new MatchingProvider()
                        .add(new DDGProvider())
                        .add(new FeedZillaCategoryProvider())
                        .add(new NYTimesProvider())
                        .add(new FolderProvider())
                  )
        .bind();
        ;
    });
  }
);