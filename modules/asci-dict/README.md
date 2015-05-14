# asci-dict

This module allows to build a nested hash, stick some placeholders in the leaves and then
retrieve and interpolate from it.

Throws Reference error when:
* key is not found in nested hash
* not all variables are given for interpolation

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-dict
```

## example

```javascript
var dict = require('../asci-dict');
var urls = {
  retargeting: {
    campaign: '/advertisers/{{ advertiserName }}/campaigns?query=RETARGET_RECORD_ID&recordId={{ recordId }}',
    lineitem: '/advertisers/{{ advertiserName }}/campaigns/{{ campaignName }}/lineitems?query=RETARGET_RECORD_ID&recordId={{ recordId }}'
  },
  persistence: {
    segment: '/persistence/warehouse/{{ warehouseId }}/segment/{{ segmentId }}'
  }
};

dict.get(urls, 'retargeting.campaign', { advertiserName: 'myAdv', recordId: 'XXI-li1'});
```

## license

ASI
