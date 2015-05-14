var BaseView = require('../asci-base-view');
var constants = require('../asci-constants');
var i18n = require('../asci-i18n');

var templates = require('./templates');

var ButtonView = BaseView.extend({
  type: 'ButtonView',

  bindings: {
    className: {
      type: 'class',
      hook: 'button'
    },
    dataTest: {
      type: 'attribute',
      name: 'data-test',
      hook: 'button'
    },
    disabled: [
      {
        type: 'booleanClass',
        hook: 'button'
      },
      {
        type: 'booleanAttribute',
        name: 'disabled',
        hook: 'button'
      }
    ],
    displayLabel: {
      type: 'text',
      hook: 'label'
    },
    isDefault: {
      type: 'booleanClass',
      hook: 'button'
    },
    typeClass: {
      type: 'class',
      hook: 'button'
    }
  },
  derived: {
    typeClass: {
      deps: ['buttonType'],
      fn: function() {
        switch (this.buttonType) {
          case 'form':
            return 'formButton';
          default:
            return 'defaultButton';
        }
      }
    }
  },
  events: {
    click: 'handleClick',
    keyUp: 'handleKeyUp'
  },
  props: {
    buttonType: ['string', true, 'default'],
    className: 'string',
    clickHandlerName: 'string',
    completedLabel: 'string',
    data: 'any', // storage for any data attached to this button, useful for event handlers
    dataTest: 'string',
    disabled: ['boolean', true, false],
    displayLabel: 'string',
    errorLabel: 'string',
    isDefault: ['boolean', true, false],
    label: 'string',
    name: ['string', true, ''],
    parent: 'object',
    workingLabel: 'string'
  },
  template: templates.button,

  constructor: function(options, parent) {
    options.parent = parent;
    return BaseView.prototype.constructor.call(this, options);
  },
  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    if (!this.parent) {
      throw new TypeError("No parent found for button " + this.toString());
    }
    if (!this.name) {
      throw new TypeError("No name found for button " + this.toString());
    }
    if (!this.clickHandlerName) {
      throw new TypeError("No clickHandlerName found for button " + this.toString());
    }
    if (!this.parent[this.clickHandlerName]) {
      throw new TypeError("No method named " + this.clickHandlerName + " found on parent for button " + this.toString());
    }
    if (!this.workingLabel) {
      this.set('workingLabel', this.label);
    }
    if (!this.completedLabel) {
      this.set('completedLabel', this.label);
    }
    if (!this.errorLabel) {
      this.set('errorLabel', this.label);
    }
    this.set('displayLabel', this.label);
  },

  handleChangeState: function(view, state) {
    switch (state) {
      case 'working':
        this.set('displayLabel', this.workingLabel);
        this.set('disabled', true);
        break;
      case 'completed':
        this.stopListening(this.parent, 'change:state');
        this.set('displayLabel', this.completedLabel);
        this.set('disabled', false);
        break;
      case 'error':
        this.stopListening(this.parent, 'change:state');
        this.set('displayLabel', this.errorLabel);
        this.set('disabled', false); // might want to revisit this
        break;
      default:
        this.stopListening(this.parent, 'change:state');
        this.set('displayLabel', this.label);
        this.set('disabled', false);
    }
  },
  handleClick: function() {
    this.listenTo(this.parent, 'change:state', this.handleChangeState);
    this.parent[this.clickHandlerName](this);
  },
  handleKeyUp: function(e) {
    if (e.keyCode === constants.get('KEY_CODES.enter')) {
      this.click(e);
    }
  },
  toString: function() {
    var props = [
      'name:' + this.name,
      'className:' + this.className,
      'label:' + this.label,
      'clickHandlerName:' + this.clickHandlerName
    ];
    return props.join('; ');
  }
});

ButtonView.standardButtons = {
  apply: {
    className: 'applyButton',
    clickHandlerName: 'handleClickApply',
    completedLabel: i18n.APPLIED,
    dataTest: 'apply-button',
    label: i18n.APPLY,
    name: 'applyButton',
    workingLabel: i18n.APPLYING
  },
  cancel: {
    className: 'cancelButton',
    clickHandlerName: 'handleClickCancel',
    completedLabel: i18n.CANCELED,
    dataTest: 'cancel-button',
    label: i18n.CANCEL,
    name: 'cancelButton',
    workingLabel: i18n.CANCELING
  },
  close: {
    className: 'closeButton',
    clickHandlerName: 'handleClickClose',
    dataTest: 'close-button',
    label: i18n.CLOSE,
    name: 'closeButton'
  },
  create: {
    className: 'createButton',
    clickHandlerName: 'handleClickCreate',
    dataTest: 'create-button',
    label: i18n.CREATE_NEW,
    name: 'createButton'
  },
  next: {
    className: 'nextButton',
    clickHandlerName: 'handleClickNext',
    dataTest: 'next-button',
    label: i18n.NEXT,
    name: 'nextButton'
  },
  save: {
    className: 'saveButton',
    clickHandlerName: 'handleClickSave',
    completedLabel: i18n.SAVED,
    dataTest: 'save-button',
    label: i18n.SAVE,
    name: 'saveButton',
    workingLabel: i18n.SAVING
  }
};

module.exports = ButtonView;
