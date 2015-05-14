var test = require('tape');
var dict = require('../asci-dict.js');
var sample = {
  retargeting: {
    campaign: '/advertisers/{{ advertiserName }}/campaigns?query=RETARGET_RECORD_ID&recordId={{ recordId }}',
    lineitem: '/advertisers/{{ advertiserName }}/campaigns/{{ campaignName }}/lineitems?query=RETARGET_RECORD_ID&recordId={{ recordId }}'
  },
  test: {
    test2: {
      test3: 'success'
    }
  },
  lineitem: {
    daypart: {
      days: {
        monday: 'M',
        tuesday: 'Tu',
        wednesday: 'W',
        thursday: 'Th',
        friday: 'F',
        saturday: 'Sa',
        sunday: 'Su'
      },
      hours: {
        0: 'Midnight',
        1: '1:00a',
        2: '2:00a',
        3: '3:00a',
        4: '4:00a',
        5: '5:00a',
        6: '6:00a',
        7: '7:00a',
        8: '8:00a',
        9: '9:00a',
        10: '10:00a',
        11: '11:00a',
        12: 'Noon',
        13: '1:00p',
        14: '2:00p',
        15: '3:00p',
        16: '4:00p',
        17: '5:00p',
        18: '6:00p',
        19: '7:00p',
        20: '8:00p',
        21: '9:00p',
        22: '10:00p',
        23: '11:00p'
      }
    }
  }
};

test('retrieval', function(t) {
  t.equal(dict.get(sample, 'test.test2.test3'), 'success');
  t.deepEqual(dict.get(sample, 'test.test2'), { test3: 'success' });
  t.deepEqual(dict.get(sample, 'test'), { test2: { test3: 'success' } });
  t.equal(dict.get(sample, 'lineitem.daypart.days.sunday'), 'Su');
  t.equal(dict.get(sample, 'lineitem.daypart.hours.0'), 'Midnight');
  t.end();
});

test('retrieval errors', function(t) {
  var f = function() {
    dict.get(sample, 'unknown');
  };
  t.throws(f);
  t.end();
});

test('interpolation', function(t) {
  t.equal(dict.get(sample, 'retargeting.campaign', {
    advertiserName: 'myAdv',
    recordId: 'XXII-ca1'
  }), '/advertisers/myAdv/campaigns?query=RETARGET_RECORD_ID&recordId=XXII-ca1');
  t.equal(dict.get(sample, 'retargeting.lineitem', {
    advertiserName: 'myAdv',
    campaignName: 'myCampaign',
    recordId: 'XXII-li1'
  }), '/advertisers/myAdv/campaigns/myCampaign/lineitems?query=RETARGET_RECORD_ID&recordId=XXII-li1');
  t.end();
});

test('interpolation errors', function(t) {
  var f = function() {
    dict.get(sample, 'retargeting.campaign');
  };

  t.throws(f);
  t.end();
});
