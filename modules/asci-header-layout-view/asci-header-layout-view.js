var $ = require('jquery');
var BaseView = require('../asci-base-view');
var i18n = require('../asci-i18n');
var templateHeader = require('./templates').header;

var HeaderView = BaseView.extend({
  type: 'HeaderView',

  bindings: {
    'model.state': { type: 'class', hook: 'pageHeader' },
    'dataLabel': { type: 'text', hook: 'dataLabel' },
    'mediaLabel': { type: 'text', hook: 'mediaLabel' },
    'insightsLabel': { type: 'text', hook: 'insightsLabel' }
  },
  events: {
    'click': 'onClickHeader',
    'click .border': 'onClickBorder',
    'click .data': 'onClickData',
    'click .media': 'onClickMedia',
    'click .insights': 'onClickInsights',
    'mouseout .content': 'onMouseoutContent',
    'mouseover .border': 'onMouseoverBorder'
  },
  session: {
    dataLabel: ['string', true, i18n.DATA],
    mediaLabel: ['string', true, i18n.MEDIA],
    insightsLabel: ['string', true, i18n.INSIGHTS]
  },
  template: templateHeader,

  onClickBorder: function(e) {
    var state = this.model.get('state');
    // FIXME: this needs to go away once we have the 'collapse' button or whatever
    if (state === 'default') {
      e.stopPropagation();
      this.model.set('state', 'collapsed');
    }
  },
  onClickData: function(e) {
    e.preventDefault();
  },
  onClickHeader: function(e) {
    if (this.model.get('state') !== 'default') {
      this.model.set('state', 'default');
    }
  },
  onClickMedia: function(e) {
    e.preventDefault();
  },
  onClickInsights: function(e) {
    e.preventDefault();
  },
  onMouseoutContent: function(e) {
    e.stopPropagation();
    if (!$(e.relatedTarget).parents('.pageHeader').length && (this.model.get('state') === 'expanded')) {
      this.model.set('state', 'collapsed');
    }
  },
  onMouseoverBorder: function(e) {
    var state = this.model.get('state');
    if (state === 'collapsed') {
      this.model.set('state', 'expanded');
    }
  }
});

module.exports = HeaderView;
