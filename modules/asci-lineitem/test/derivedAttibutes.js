var test = require('tape');
var Lineitem = require('../asci-lineitem');

test('derived customTargetsDIRECT_PUBLISHER_ID', function(t) {
  var lineitem = new Lineitem({
    customTargets: [
      {
        "attribute": "DIRECT_PRIORITY",
        "values": [
          "2"
        ]
      },
      {
        "attribute": "DIRECT_PUBLISHER_ID",
        "values": [
          "qLYE7QxZ458OzhZjE2ObK30e0Ew"
        ]
      },
      {
        "attribute": "DIRECT_SITE_ID",
        "values": [
          "DxEq7fiHC0FaSUUGIw6wv_tzPQ8",
          "nJSv3nNJO5bc3rKeTdeOIwuhYkA",
          "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
          "QVlyoaidBls47lG2D-4AqltlwUY"
        ]
      }
    ]
  });
  t.deepEqual(lineitem.customTargetsDIRECT_PUBLISHER_ID, [
    "qLYE7QxZ458OzhZjE2ObK30e0Ew"
  ]);
  t.end();
});

test('derived customTargetsDIRECT_SITE_ID', function(t) {
  var lineitem = new Lineitem({
    customTargets: [
      {
        "attribute": "DIRECT_PRIORITY",
        "values": [
          "2"
        ]
      },
      {
        "attribute": "DIRECT_PUBLISHER_ID",
        "values": [
          "qLYE7QxZ458OzhZjE2ObK30e0Ew"
        ]
      },
      {
        "attribute": "DIRECT_SITE_ID",
        "values": [
          "DxEq7fiHC0FaSUUGIw6wv_tzPQ8",
          "nJSv3nNJO5bc3rKeTdeOIwuhYkA",
          "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
          "QVlyoaidBls47lG2D-4AqltlwUY"
        ]
      }
    ]
  });
  t.deepEqual(lineitem.customTargetsDIRECT_SITE_ID, [
    "DxEq7fiHC0FaSUUGIw6wv_tzPQ8",
    "nJSv3nNJO5bc3rKeTdeOIwuhYkA",
    "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
    "QVlyoaidBls47lG2D-4AqltlwUY"
  ]);
  t.end();
});

test('derived directCustomPrices', function(t) {
  var lineitem = new Lineitem({
    customPrices: [
      {
        "provider": "DIRECT",
        "customTargetAttribute": "DIRECT_SITE_ID",
        "customTargetValue": "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
        "costCpm": 4.00
      },
      {
        "provider": "DIRECT",
        "customTargetAttribute": "DIRECT_PUBLISHER_ID",
        "customTargetValue": "qLYE7QxZ458OzhZjE2ObK30e0Ew",
        "costCpm": 5.00
      },
      {
        "provider": "DOES NOT BELONG",
        "customTargetAttribute": "DIRECT_PUBLISHER_ID",
        "customTargetValue": "qLYE7QxZ458OzhZjE2ObK30e0Ew",
        "costCpm": 5.00
      }
    ]
  });
  t.deepEqual(lineitem.directCustomPrices, [
    {
      "provider": "DIRECT",
      "customTargetAttribute": "DIRECT_SITE_ID",
      "customTargetValue": "mYLfLbdRNCbYNhqfbUhfcJSMvM8",
      "costCpm": 4.00
    },
    {
      "provider": "DIRECT",
      "customTargetAttribute": "DIRECT_PUBLISHER_ID",
      "customTargetValue": "qLYE7QxZ458OzhZjE2ObK30e0Ew",
      "costCpm": 5.00
    }
  ]);
  t.end();
});
