//
// Question Editor Index View
// =============================================================================
//
// * Author: [Craig Davis](craig.davis@learningstation.com)
// * Since: 5/15/2015
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var $                   = require('jquery'),
      SimpleView          = require('views/ui/simple');

  return SimpleView.extend({
    template: 'index/index',

    showEditor: function (e) {
      var model, EditorView, QuestionView,
          $target = $(e.target),
          type    = $target.val();

      if (!type) { return; }

      $('.welcomeText').slideUp();
      $('.form-actions').removeClass('hide');

      //to get rid of zombie views
      if (this.currentView) {
        this.currentView.undelegateEvents();
      }

      if (this.currentQuestionView) {
        this.currentQuestionView.undelegateEvents();
      }

      model = QuestionsCollection.prototype.model({
        type: type
      }, {});

      EditorView   = QuestionViews.editor(type);
      QuestionView = QuestionViews.view(type);

      this.editorView = new EditorView({
        model : model,
        el    : this.$('#QuestionEditor')
      });

      this.questionView = new QuestionView({
        model : model,
        el    : this.$('#Preview')
      });

      this.currentEditorView = this.editorView;
      this.currentQuestionView = this.questionView;

      this.listenTo(model, 'change', this.showJSON);
      this.listenTo(model, 'change', this.showPreview);

      this.showJSON();
      this.editorView.render();
      this.questionView.render();
      this.clearHighlights();
    },

    // Update the JSON and question preview
    saveQuestion: function (e) {

      // generating the model
      // find the type of question it is.
      //

      e.preventDefault();
      this.showJSON();
      this.showPreview();
    },

    // Show the model as a JSON structure in the UI
    showJSON: function () {
      var questionData = this.editorView.model.toJSON();
      this.$('#Debug').html(JSON.stringify(questionData, null, 2));
    },

    // Render the current question view in the UI
    showPreview: function () {
      this.questionView.render();
    },

    clearHighlights : function () {
      //remove the highlights we added to the body.
      $('.overlay').remove();
    }
  });
});

/* End of file index.js */
