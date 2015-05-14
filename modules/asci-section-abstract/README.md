# asci-section-abstract

This module provides an abstraction section view as the basis for content sections.
Each content section needs a view (derived from this base class) and a state as the minimum.
Both come with a set of conventions.

## install

```
npm set registry http://npmrepo.ascitest.net:4444
npm install asci-section-abstract
```

## example

```javascript
SectionView = require('asci-section-abstract');

var TemplateManagerSectionView = SectionView.extend({
  modelType: 'TemplateManager',
  type: 'TemplateManagerSectionView'
});
```

## license

ASI
