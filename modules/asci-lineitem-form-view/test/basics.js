if (!Function.prototype.bind) { Function.prototype.bind = require('function-bind'); }

var test = require('tape');
var LineitemFormView = require('../asci-lineitem-form-view.js');
var Model = require('ampersand-model');

test('_applyCustomTargetsMappings', function(t) {
  var appNexus = {
    attribute: "APPNEXUS_SELLING_MEMBER_ID",
    values: ["280", "357", "459", "514", "852", "OTHER"]
  };
  var rightMedia = {
    attribute: "RIGHTMEDIA_SELLER_SEAT",
    values: [
    "23351", "57022", "29657", "77767", "98090", "153601", "153597", "257455", "3", "546070", "89285", "58629",
    "5676", "430106", "63764", "48813", "29507", "477850", "700194", "318061"]
  };
  var openRtb = {
    attribute: "OPENRTB_PROVIDER",
    values: ["aol", "federated", "liverail", "mopub", "openx", "smartclip", "tremor"]
  };
  var lineitemFormView = new LineitemFormView({model: new Model()});
  // lineitemFormView.render();

  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({}),
  { customTargets: [] },
    'should return empty array for customTargets');

  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb]
    }),
  { customTargets: [appNexus, rightMedia, openRtb] },
    'should preserve array of customTargets');

  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsVIEWABILITY: '20'
    }),
    { customTargets: [{
      attribute: 'VIEWABILITY', values: ['20']
    }, appNexus, rightMedia, openRtb ] },
    'set viewability');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsBROWSER: ['CHROME']
    }),
    { customTargets: [{
      attribute: 'BROWSER', values: ['CHROME']
    }, appNexus, rightMedia, openRtb ] },
    'set browser');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsCONTEXT_CATEGORY: ['IAB2-2']
    }),
    { customTargets: [{
      attribute: 'CONTEXT_CATEGORY', values: ['IAB2-2']
    }, appNexus, rightMedia, openRtb ] },
    'set context category');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsDEVICE_TYPE: ['PHONE']
    }),
    { customTargets: [{
      attribute: 'DEVICE_TYPE', values: ['PHONE']
    }, appNexus, rightMedia, openRtb ] },
    'set device type');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsOPERATING_SYSTEM: ['MAC']
    }),
    { customTargets: [{
      attribute: 'OPERATING_SYSTEM', values: ['MAC']
    }, appNexus, rightMedia, openRtb ] },
    'set operating system');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsMOBILE: 'MOBILE_APP'
    }),
    { customTargets: [{
      attribute: 'MOBILE', values: ['MOBILE_APP']
    }, appNexus, rightMedia, openRtb ] },
    'set mobile');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [appNexus, rightMedia, openRtb],
      customTargetsMANUAL_WHITELIST: ['www.test.com']
    }),
    { customTargets: [{
      attribute: 'MANUAL_WHITELIST', values: ['www.test.com']
    }, appNexus, rightMedia, openRtb ] },
    'set mobile');

  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [
        {
          attribute: 'VIEWABILITY',
          values: ['20']
        },
        appNexus,
        rightMedia,
        openRtb
      ],
      customTargetsVIEWABILITY: '20'
    }),
    {
      customTargets: [
        {
          attribute: 'VIEWABILITY',
          values: ['20']
        },
        appNexus,
        rightMedia,
        openRtb
      ]
    },
    'dedupe double key');
  t.deepEqual(
    lineitemFormView._applyCustomTargetsMappings({
      customTargets: [
        {
          attribute: 'VIEWABILITY',
          values: ['30']
        },
        appNexus,
        rightMedia,
        openRtb
      ],
      customTargetsVIEWABILITY: '20'
    }),
    {
      customTargets: [
        {
          attribute: 'VIEWABILITY',
          values: ['20']
        },
        appNexus,
        rightMedia,
        openRtb
      ]
    },
    'dedupe double key, prefer new value');

  t.end();
});
