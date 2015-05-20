var _ = require('lodash');
var extendObject = require('extend-object');
var hoek = require('hoek');
var i18n = require('../../../asci-i18n');

_.templateSettings.escape = /\{\{-(.+?)\}\}/g;
_.templateSettings.evaluate = /\{\{(.+?)\}\}/g;
_.templateSettings.interpolate = /\{\{=(.+?)\}\}/g;

var messages = {
  _default: i18n.ERRORS.defaultMessage,
  advertiserCpm: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.ADVERTISER_CPM,
      min: 0.01,
      max: 1000,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.ADVERTISER_CPM
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.ADVERTISER_CPM,
        when: i18n.PRICING_TYPE,
        isNot: i18n.FIXED_CPM
      })
    },
    number: {
      greater: _.template(i18n.ERRORS.numericMinMaxFraction)({
        name: i18n.ADVERTISER_CPM,
        min: 0.01,
        max: 1000,
        fraction: i18n.TWO
      }),
      max: _.template(i18n.ERRORS.numericMinMaxFraction)({
        name: i18n.ADVERTISER_CPM,
        min: 0.01,
        max: 1000,
        fraction: i18n.TWO
      })
    }
  },
  brandsafeList: {
    array: {
      max: _.template(i18n.ERRORS.arrayMax)({
        name: i18n.BRAND_SAFE_LIST,
        limit: 50000
      })
    }
  },
  costCpm: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.COST_CPM,
      min: 0,
      max: 1000,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.COST_CPM
      })
    }
  },
  costPackages: {
    array: {
      min: _.template(i18n.ERRORS.atLeast)({
        name: i18n.BUDGET_GROUP,
        min: i18n.ONE
      }),
      overlap: i18n.ERRORS.costPackagesOverlap
    }
  },
  customPrices: {
    invalidProvider: i18n.ERRORS.customPricesInvalidProvider
  },
  customTargets: {
    default: i18n.ERRORS.customTargetsDefaultMessage,
    invalidProvider: i18n.ERRORS.customTargetsInvalidProvider
  },
  customTargetsINVENTORY_TYPE: {
    any: {
      unknown: i18n.ERRORS.customTargetsINVENTORY_TYPEInvalid
    }
  },
  customTargetsMANUAL_WHITELIST: {
    array: {
      includesOne: _.template(i18n.ERRORS.includeCharsMinLength)({
        minLength: 4,
        name: i18n.MOBILE_APP_IDS,
        chars: 'a-z, 0-9, ., _, or -'
      })
    },
    invalidMobileAppId: i18n.ERRORS.customTargetsINVENTORY_TYPEInvalidMobileAppId
  },
  // TODO remove this as publisher are no longer supported
  customTargetsDIRECT_PUBLISHER_ID: {
    array: {
      min: _.template(i18n.ERRORS.atLeast)({
        name: i18n.PUBLISHER_OR_PLACEMENT,
        min: i18n.ONE
      }),
      includesOne: _.template(i18n.ERRORS.includeChars)({
        name: i18n.PUBLISHER_OR_PLACEMENT,
        chars: 'A-Z, a-z, 0-9, - or _'
      })
    },
    any: {
      unknown: i18n.publishersInvalid
    }
  },
  customTargetsDIRECT_SITE_ID: {
    array: {
      min: _.template(i18n.ERRORS.atLeast)({
        name: i18n.PLACEMENT,
        min: i18n.ONE
      }),
      includesOne: _.template(i18n.ERRORS.includeChars)({
        name: i18n.PLACEMENT_KEY,
        chars: 'A-Z, a-z, 0-9, - or _'
      })
    },
    any: {
      unknown: i18n.placementsInvalid
    }
  },
  customTargetsFOLD_POSITION: {
    array: {
      min: _.template(i18n.ERRORS.atLeast)({
        name: i18n.AD_UNIT_LOCATION,
        min: i18n.ONE
      })
    }
  },
  customTargetsPUB_KEY: {
    array: {
      includesOne: _.template(i18n.ERRORS.publisherKeyPattern)({
        name: i18n.PUBLISHER_KEY
      })
    }
  },
  customTargetsPUB_KEY_EXCLUSIONS: {
    array: {
      includesOne: _.template(i18n.ERRORS.publisherKeyPattern)({
        name: i18n.PUBLISHER_KEY
      })
    }
  },
  dataType: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.DATA_TYPE
      })
    }
  },
  description: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.LINE_ITEM_NAME
      })
    },
    notUnique: _.template(i18n.ERRORS.notUnique)({
      name: i18n.LINE_ITEM_NAME
    }),
    string: {
      max: _.template(i18n.ERRORS.length)({
        name: i18n.LINE_ITEM_NAME,
        min: 4,
        max: 100
      }),
      min: _.template(i18n.ERRORS.length)({
        name: i18n.LINE_ITEM_NAME,
        min: 4,
        max: 100
      }),
      regex: {
        base: _.template(i18n.ERRORS.excludeChars)({
          name: i18n.LINE_ITEM_NAME,
          chars: "/, |, \\, \", +, or ~~~"
        })
      }
    }
  },
  directCustomPrices: {
    array: {
      includesOne: i18n.ERRORS.publishersInvalid
    }
  },
  dynamicCreativeAlias: {
    string: {
      regex: {
        base: _.template(i18n.ERRORS.includeChars)({
          name: i18n.DYNAMIC_CREATIVE_ALIAS,
          chars: 'A-Z, a-z, 0-9, - or _'
        })
      }
    }
  },
  flightDates: {
    date: {
      order: i18n.ERRORS.flightDatesInvalid
    },
    range: {
      overlap: i18n.ERRORS.flightDatesRangeInvalid
    }
  },
  fixedTimeZone: {
    invalid: i18n.ERRORS.fixedTimeZoneInvalid
  },
  forcedDelivery: {
    invalid: i18n.ERRORS.forcedDeliveryInvalid
  },
  formatType: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.MEDIA_TYPE
      })
    }
  },
  frequencyCap: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.FREQUENCY_CAP
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.MAX_EXPOSURES_PER_INTERVAL,
        when: i18n.FREQUENCY_CAP,
        isNot: i18n.FREQUENCY_CAP
      })
    },
    number: {
      integer: _.template(i18n.ERRORS.numericInteger)({
        name: i18n.MAX_EXPOSURES_PER_INTERVAL
      })
    }
  },
  frequencyCapGroup: {
    any: {
      unknown: i18n.ERRORS.frequencyCapGroupInvalid,
      required: _.template(i18n.ERRORS.required)({
        name: i18n.FREQUENCY_CAP_GROUP
      })
    }
  },
  frequencyCapUnit: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.INTERVAL_TO_LIMIT_BY
      })
    }
  },
  manualBlacklist: {
    array: {
      includesOne: _.template(i18n.ERRORS.domainNames)({
        name: i18n.DOMAIN_BLACKLIST,
        max: 100,
        min: 3
      }),
      max: _.template(i18n.ERRORS.arrayMax)({
        name: i18n.DOMAIN_BLACKLIST,
        limit: 50000
      })
    },
    string: {
      hostname: _.template(i18n.ERRORS.hostname)({
        name: i18n.DOMAIN_BLACKLIST
      })
    }
  },
  manualExcludedAppIds: {
    array: {
      includesOne: _.template(i18n.ERRORS.includeCharsMinLength)({
        minLength: 4,
        name: i18n.MOBILE_APP_IDS,
        chars: 'a-z, 0-9, ., _, or -'
      })
    },
    invalidMobileAppId: i18n.ERRORS.customTargetsINVENTORY_TYPEInvalidMobileAppId
  },
  manualIncludedDomains: {
    array: {
      includesOne: _.template(i18n.ERRORS.domainNames)({
        name: i18n.DOMAIN_WHITELIST,
        max: 100,
        min: 3
      }),
      max: _.template(i18n.ERRORS.arrayMax)({
        name: i18n.DOMAIN_WHITELIST,
        limit: 50000
      })
    },
    string: {
      hostname: _.template(i18n.ERRORS.hostname)({
        name: i18n.DOMAIN_WHITELIST
      })
    }
  },
  markupCpm: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.FIXED_CPM_MARKUP,
      min: 0,
      max: 2000,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.PERCENTAGE_MARKUP_OR_FIXED_CPM_MARKUP
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.FIXED_CPM_MARKUP,
        when: i18n.PRICING_TYPE,
        isNot: i18n.COST_PLUS
      })
    }
  },
  markupPercent: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.PERCENTAGE_MARKUP,
      min: 0,
      max: 200,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.PERCENTAGE_MARKUP_OR_FIXED_CPM_MARKUP
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.PERCENTAGE_MARKUP,
        when: i18n.PRICING_TYPE,
        isNot: i18n.COST_PLUS
      })
    }
  },
  maxBidCpm: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.MAX_BID_CPM,
      min: 0.01,
      max: 1000,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.MAX_BID_CPM
      })
    },
    number: {
      greater: _.template(i18n.ERRORS.numericMinMaxFraction)({
        name: i18n.MAX_BID_CPM,
        min: 0.01,
        max: 1000,
        fraction: i18n.TWO
      }),
      max: _.template(i18n.ERRORS.numericMinMaxFraction)({
        name: i18n.MAX_BID_CPM,
        min: 0.01,
        max: 1000,
        fraction: i18n.TWO
      })
    }
  },
  name: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.TEMPLATE_NAME
      })
    },
    notUnique: _.template(i18n.ERRORS.notUnique)({
      name: i18n.TEMPLATE_NAME
    }),
    string: {
      max: _.template(i18n.ERRORS.length)({
        name: i18n.TEMPLATE_NAME,
        min: 4,
        max: 100
      }),
      min: _.template(i18n.ERRORS.length)({
        name: i18n.TEMPLATE_NAME,
        min: 4,
        max: 100
      }),
      regex: {
        base: _.template(i18n.ERRORS.excludeChars)({
          name: i18n.TEMPLATE_NAME,
          chars: '/, |, \\\\, \", or +'
        })
      }
    }
  },
  optimizationBudgetImpressions: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.QUALIFYING_IMPRESSIONS
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.QUALIFYING_IMPRESSIONS,
        when: i18n.AUTOMATIC_OPTIMIZATION,
        isNot: i18n.ON
      })
    },
    number: {
      integer: _.template(i18n.ERRORS.numericInteger)({
        name: i18n.QUALIFYING_IMPRESSIONS
      })
    }
  },
  override: {
    invalid: i18n.ERRORS.overrideInvalid
  },
  productType: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.BUY_TYPE
      })
    }
  },
  subFormProviders: {
    any: {
      allowOnly: _.template(i18n.ERRORS.atLeast)({
        name: i18n.PROVIDER,
        min: i18n.ONE
      })
    },
    array: {
      min: _.template(i18n.ERRORS.atLeast)({
        name: i18n.PROVIDER,
        min: i18n.ONE
      })
    },
    invalid: i18n.ERRORS.providersInvalid,
    invalidBudgetGroupCurrency: i18n.ERRORS.providersInvalidBudgetGroupCurrency
  },
  subFormGeo: {
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.GEO_LOCATION
      })
    }
  },
  targetDayParts: {
    any: {
      required: i18n.ERRORS.targetDayPartsRequired
    },
    date: {
      order: i18n.ERRORS.targetDayPartsOrder
    }
  },
  targetCpa: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.TARGET_CPA,
      min: 0,
      max: 9999,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.TARGET_CPA
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.TARGET_CPA,
        when: i18n.AUTOMATIC_OPTIMIZATION,
        isNot: i18n.CPA
      })
    }
  },
  targetCtr: {
    default: _.template(i18n.ERRORS.numericMinMaxFraction)({
      name: i18n.TARGET_CTR,
      min: 0,
      max: 9999,
      fraction: i18n.TWO
    }),
    any: {
      required: _.template(i18n.ERRORS.required)({
        name: i18n.TARGET_CTR
      }),
      unknown: _.template(i18n.ERRORS.fieldForbidden)({
        name: i18n.TARGET_CTR,
        when: i18n.AUTOMATIC_OPTIMIZATION,
        isNot: i18n.CTR
      })
    }
  }
};

var serverMessageMapping = {
  advertiserCpm: {
    invalid: messages.advertiserCpm.any.unknown
  },
  brandsafeList: {
    arrayMax: messages.brandsafeList.array.max
  },
  customPrices: {
    invalidProvider: messages.customPrices.invalidProvider
  },
  customTargets: {
    invalidProvider: messages.customTargets.invalidProvider
  },
  customTargetsMANUAL_WHITELIST: {
    invalidMobileAppId: messages.customTargetsMANUAL_WHITELIST.invalidMobileAppId
  },
  customTargetsPUB_KEY: {
    Pattern: messages.customTargetsPUB_KEY.array.includesOne
  },
  customTargetsPUB_KEY_EXCLUSIONS: {
    Pattern: messages.customTargetsPUB_KEY_EXCLUSIONS.array.includesOne
  },
  description: {
    NotNull: messages.description.any.required,
    notUnique: messages.description.notUnique,
    Pattern: messages.description.string.regex.base,
    Size: messages.description.string.max
  },
  fixedTimeZone: {
    invalid: messages.fixedTimeZone.invalid
  },
  flightDates: {
    invalid: messages.flightDates.date.order,
    invalidRange: messages.flightDates.range.overlap
  },
  forcedDelivery: {
    invalid: messages.forcedDelivery.invalid
  },
  manualBlacklist: {
    arrayMax: messages.manualBlacklist.array.max,
    Pattern: messages.manualBlacklist.string.hostname,
    Size: messages.manualBlacklist.array.max
  },
  name: {
    NotNull: messages.name.any.required,
    notUnique: messages.name.notUnique,
    Pattern: messages.name.string.regex.base,
    Size: messages.name.string.max
  },
  optimizationBudgetImpressions: {
    invalid: messages.optimizationBudgetImpressions.any.unknown
  },
  override: {
    invalid: messages.override.invalid
  },
  providers: {
    invalid: messages.subFormProviders.invalid,
    Size: messages.subFormProviders.array.min
  }
};

var language = {
  get: function(key) {
    var node = {};
    if (_.has(messages, key)) {
      node = messages[key];
    }
    return extendObject({}, node, { label: 'joi' });
  },
  getMessage: function(lookup) {
    var message = hoek.reach(messages, lookup);
    if (!message) {
      var fieldName = lookup.split('.')[0];
      message = hoek.reach(messages, fieldName + '.default');
    }
    if (!message) {
      message = language.getServer(lookup);
    }
    if (!message) {
      message = messages._default;
    }
    return message;
  },
  getServer: function(lookup) {
    return hoek.reach(serverMessageMapping, lookup);
  }
};

module.exports = language;
