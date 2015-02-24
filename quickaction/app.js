require.config({
  baseUrl: "/js",
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
    "util/Property",
    "providers/matching/MatchingProvider",
    "/providers/ddg/DDGProvider.js",
    "/providers/feedzilla/FeedZillaCategoryProvider.js",
    "/providers/fs/FolderProvider.js",
    "/providers/nytimes/NYTimesProvider.js",
    "QuickAction"
  ],
  function($, _, B,
          Property,
          MatchingProvider,
          DDGProvider,
          FeedZillaCategoryProvider,
          FolderProvider,
          NYTimesProvider,
          QuickAction
  ) {
    $(function() {
      var open= new Property(true);
      QuickAction
        .create($("#demo").css("margin", "100px"))
        .open(open)
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
