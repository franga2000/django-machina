var machina = (function(m, $) {

  function cloneFormset(selector, type) {
    var new_element = $(selector).clone(true);
    var total = $('#id_' + type + '-TOTAL_FORMS').val();

    new_element.find(':input').each(function() {
      // update the name and id of the input field
      var new_name = $(this).attr('name').replace('-' + (total-1) + '-','-' + total + '-');
      $(this).attr('name', new_name);
      var new_id = $(this).attr('id').replace('-' + (total-1) + '-','-' + total + '-');
      $(this).attr('id', new_id);
      $(this).parent('label').attr('for', new_id);
      $(this).prev('label').attr('for', new_id);
      if ($(this).is(':checkbox')) {
        $(this).attr('checked', false);
      }
      else {
        $(this).attr('value', '');
        $(this).val('');
      }
    });
    new_element.find('.initial').remove();
    $('#id_' + type + '-TOTAL_FORMS').val(parseInt(total)+1);
    $(selector).after(new_element);
  }

  m.poll = {
    init: function(add_more_selector, last_form_selector) {
      if(typeof(add_more_selector) === 'undefined') add_more_selector = '#add_more_poll_option';
      if(typeof(last_form_selector) === 'undefined') last_form_selector = '#poll_formset div.poll-option-form:last';

      $(add_more_selector).click(function(ev) {
        ev.preventDefault();
        cloneFormset(last_form_selector, 'poll');
      });
    }
  };

  m.attachment = {
    init: function(add_more_selector, last_form_selector) {
      if(typeof(add_more_selector) === 'undefined') add_more_selector = '#add_more_attachment';
      if(typeof(last_form_selector) === 'undefined') last_form_selector = '#attachment_formset div.attachment-form:last';

      $(add_more_selector).click(function(ev) {
        ev.preventDefault();
        cloneFormset(last_form_selector, 'attachment');
      });
    }
  };

  function find_post(el) {
      var path = $(el).parents('.post-review .post-content');
      if (path.length != 0)
        return path[0];
      else
        return false;
  }

  m.quote = {
    init: function(quote_menu_selector, quote_button_selector, quote_hint_selector) {
      if(document.getSelection === undefined) return;

      if(typeof(quote_menu_selector) === 'undefined') quote_menu_selector = '.quote-menu';
      if(typeof(quote_button_selector) === 'undefined') quote_button_selector = '#quote-button';
      if(typeof(quote_hint_selector) === 'undefined') quote_hint_selector = '#quote-hint';

      $(quote_button_selector).hide();
      $(quote_menu_selector).removeClass('hidden');

      $(document).on('selectstart selectionchange', function(ev) {
        var selection = document.getSelection();
        if (selection != '' && find_post(selection.anchorNode) && find_post(selection.focusNode)) {
          $(quote_hint_selector).hide();
          $(quote_button_selector).show();
        } else {
          $(quote_button_selector).hide();
          $(quote_hint_selector).show();
        }
      });

      $(quote_button_selector).click(function(ev) {
        m.quote.insert_quote(document.getSelection());
      });
    },
    insert_quote: function(selection) {
      var editor = MachinaMarkdownEditor.editors["id_content"];
      if(MachinaMarkdownEditor) {
        var quote = "\n > *";
        var byline = $(find_post(selection.anchorNode)).parent().find("p small.text-muted").text().trim();
        quote += "**" + byline + "**";
        quote += ": " + selection.toString() + "*\n\n";

        var text = editor.value();
        editor.value(text + quote);
      } else {
        Console.error("You have to implement `machina.quote.insert_quote(Selection)` when using a custom editor!")
      }
    }
  };

  m.init = function() {
  };

  return m;
})(machina || {}, jQuery);
