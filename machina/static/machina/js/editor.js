var MachinaMarkdownEditor = MachinaMarkdownEditor | {};

MachinaMarkdownEditor = (function() {
  var isMarkdownTextarea = function(el) {
    return (' ' + el.className + ' ').indexOf(' machina-mde-markdown ') > -1;
  };

  var createEditor = function(el) {
    return new SimpleMDE({
      element: el,
      hideIcons: ['preview', 'guide', 'side-by-side', 'fullscreen', ],
      renderingConfig: {
        singleLineBreaks: false
      },
      spellChecker: false,
    });
  };

  var init = function() {
    elements = document.getElementsByTagName("textarea");
    for (var i = 0; i < elements.length; ++i){
      var el = elements[i];
      if (isMarkdownTextarea(el)) {
        var editor = createEditor(el);
        if (el.id) MachinaMarkdownEditor.editors[el.id] = editor;
      }
    }
  };

  return {
    editors: {},
    init: function() {
      return init();
    },
  };
})();

window.onload = MachinaMarkdownEditor.init;
