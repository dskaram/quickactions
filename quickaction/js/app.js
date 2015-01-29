require.config({
  paths: {
    'jquery': 'lib/jquery',
    'doTCompiler': "lib/doTCompiler",
    'text':  'lib/text',
    'doT': 'lib/doT'
  },
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ["lib/underscore", "jquery"],
      exports: 'Backbone'
    }
  }
});

require(
  ["jquery",
    "lib/underscore",
    "lib/backbone",
    "providers/ddg/DDGProvider",
    "providers/fs/FolderProvider",
    "QuickAction"
  ],
  function($, _, B, DDGProvider, FolderProvider, QuickAction) {
    $(function() {
      QuickAction
        .create($("#demo"))
        .provider(new FolderProvider())
        .bind();
        ;
    });
  }
);