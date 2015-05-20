/*eslint no-cond-assign:0*/

var Joi = require('joi');
var WhenJoi = require('../../asci-when-joi');

var whenSchema = {
  advertiserCpm: {
    when: [
      {
        test: {
          name: '$lineItemType',
          is: 'EXTERNAL'
        },
        then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      },
      {
        test: {
          name: '$budgetCpmType',
          isNot: 'FIXED_CPM'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$lineItemType',
            isNot: 'EXTERNAL'
          },
          {
            name: '$budgetCpmType',
            is: 'FIXED_CPM'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  brandsafeList: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  budgetCpmType: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: {
          name: '$isTemplate',
          is: false
        },
        then: Joi.required()
      }
    ]
  },
  costCpm: {
    when: [
      {
        test: [
          {
            name: '$lineItemType',
            is: 'DIRECT'
          },
          {
            name: '$isTemplate',
            is: false
          }
        ],
        then: Joi.required()
      } //,
      // {
        // test: [
          // {
            // name: '$lineItemType',
            // isNot: 'DIRECT'
          // }
        // ],
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // }
    ]
  },
  costPackages: {
    when: {
      test: {
        name: '$isTemplate',
        is: false
      },
      then: Joi
        .array()
        .min(1)
        .required()
    }
  },
  // customTargetsBROWSER: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  // customTargetsCONTEXT_CATEGORY: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  // customTargetsDEVICE_TYPE: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  customTargetsDIRECT_PRIORITY: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // isNot: 'DIRECT'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$lineItemType',
            is: 'DIRECT'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  // README in case this is conflicting: customTargetsDIRECT_PUBLISHER_ID is no longer supported as per
  // decision to only support placements
  customTargetsDIRECT_SITE_ID: {
    when: [
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$lineItemType',
            is: 'DIRECT'
          }
        ],
        then: Joi.array().min(1)
      },
      // {
        // test: {
          // name: '$lineItemType',
          // isNot: 'DIRECT'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // }
    ]
  },
  customTargetsFOLD_POSITION: {
    when: [
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$lineItemType',
            is: 'RTB'
          }
        ],
        then: Joi
          .array()
          .required()
          .min(1)
      },
      {
        test: {
          name: '$lineItemType',
          is: 'RTB'
        },
        then: Joi
          .array()
          .includes(Joi
            .string()
            .valid('ANY', 'ABOVE', 'BELOW', 'UNDEFINED')
          ) //,
        // otherwise: Joi
          // .array()
          // .max(0) // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      }
    ]
  },
  customTargetsINVENTORY_TYPE: {
    when: [
      {
        test: {
          name: '$lineItemType',
          is: 'DIRECT'
        },
        then: Joi
          .required()
          .valid('SITE')
      } //,
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // }
    ]
  },
  // customTargetsMANUAL_WHITELIST: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  // customTargetsOPERATING_SYSTEM: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  customTargetsPUB_KEY: {
    when: {
      test: {
        name: '$lineItemType',
        isNot: 'DIRECT'
      },
      then: Joi.forbidden()
    }
  },
  customTargetsPUB_KEY_EXCLUSIONS: {
    when: {
      test: {
        name: '$lineItemType',
        isNot: 'DIRECT'
      },
      then: Joi.forbidden()
    }
  },
  // customTargetsVIEWABILITY: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  dataType: {
    when: {
      test: {
        name: '$isTemplate',
        is: false
      },
      then: Joi.required()
    }
  },
  description: {
    when: {
      test: {
        name: '$isTemplate',
        is: false
      },
      then: Joi.required()
    }
  },
  excludedCities: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  excludedCountries: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  excludedMetros: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  excludedRegions: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  forcedDelivery: {
    when: {
      test: {
        name: '$lineItemType',
        isNot: 'DIRECT'
      },
      then: Joi.forbidden()
    }
  },
  frequencyCap: {
    when: [
      {
        test: {
          name: '$frequencyCapType',
          isNot: 'frequencyCap,frequencyCapUnit'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$frequencyCapType',
            is: 'frequencyCap,frequencyCapUnit'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  formatType: {
    when: {
      test: {
        name: '$isTemplate',
        is: false
      },
      then: Joi.required()
    }
  },
  frequencyCapGroup: {
    when: [
      {
        test: {
          name: '$frequencyCapType',
          isNot: 'frequencyCapGroup'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$frequencyCapType',
            is: 'frequencyCapGroup'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  frequencyCapUnit: {
    when: [
      {
        test: {
          name: '$frequencyCapType',
          isNot: 'frequencyCap,frequencyCapUnit'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$frequencyCapType',
            is: 'frequencyCap,frequencyCapUnit'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  // manualBlacklist: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  markupCpm: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: {
          name: '$budgetCpmType',
          is: 'FIXED_CPM'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$budgetCpmType',
            is: 'COST_PLUS'
          },
          {
            name: '$markupPercent',
            is: ''
          }
        ],
        then: Joi.required()
      }
    ]
  },
  markupPercent: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: {
          name: '$budgetCpmType',
          is: 'FIXED_CPM'
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$budgetCpmType',
            is: 'COST_PLUS'
          },
          {
            name: '$markupCpm',
            is: ''
          }
        ],
        then: Joi.required()
      }
    ]
  },
  maxBidCpm: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // isNot: 'RTB'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: [
          {
            name: '$lineItemType',
            is: 'RTB'
          },
          {
            name: '$isTemplate',
            is: false
          }
        ],
        then: Joi.required()
      }
    ]
  },
  name: {
    when: {
      test: {
        name: '$isTemplate',
        is: true
      },
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }
  },
  optimizationType: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // },
    when: {
      test: {
        name: '$conversionEventKey',
        is: WhenJoi.falsey()
      },
      then: Joi.forbidden()
    }
  },
  optimizationBudgetImpressions: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: {
          name: '$optimizationType',
          is: ''
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$optimizationType',
            isNot: WhenJoi.falsey()
          }
        ],
        then: Joi.required()
      }
    ]
  },
  // prioritizeDeals: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // isNot: 'RTB'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  productType: {
    when: {
      test: {
        name: '$isTemplate',
        is: false
      },
      then: Joi.required()
    }
  },
  subFormProviders: {
    when: [
      {
        test: {
          name: '$isTemplate',
          is: false
        },
        then: Joi
          .array()
      },
      {
        test: {
          name: '$lineItemType',
          is: 'RTB'
        },
        then: Joi
          .array()
          .includes(Joi
            .string()
            .invalid(['DIRECT', 'MIAOZHEN']))
      } //,
      // {
        // test: [
          // {
            // name: '$isTemplate',
            // is: false
          // },
          // {
            // name: '$lineItemType',
            // is: 'RTB'
          // }
        // ],
        // then: Joi
          // .array()
          // .min(1) // FIXME UI-1039 This should be in the global $isTemplate test
      // },
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'DIRECT'
        // },
        // then: Joi
          // .array()
          // .max(1)
          // .includes(Joi
            // .string()
            // .valid('DIRECT') // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
          // )
      // },
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi
          // .array()
          // .max(1)
          // .includes(Joi
            // .string()
            // .valid('MIAOZHEN') // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
          // )
      // }
    ]
  },
  targetCities: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  targetCountries: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  targetCpa: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: {
          name: '$conversionEventKey',
          is: WhenJoi.falsey()
        },
        then: Joi.forbidden()
      },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$optimizationType',
            is: 'CPA'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  targetCtr: {
    when: [
      // {
        // test: {
          // name: '$lineItemType',
          // is: 'EXTERNAL'
        // },
        // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
      // },
      {
        test: [
          {
            name: '$isTemplate',
            is: false
          },
          {
            name: '$optimizationType',
            is: 'CTR'
          }
        ],
        then: Joi.required()
      }
    ]
  },
  // targetLanguages: {
    // when: {
      // test: {
        // name: '$lineItemType',
        // is: 'EXTERNAL'
      // },
      // then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    // }
  // },
  targetMetros: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  },
  targetRegions: {
    when: {
      test: {
        name: '$lineItemType',
        is: 'EXTERNAL'
      },
      then: Joi.forbidden() // FIXME UI-1039 figure out a way to clean "suppressed/hidden" values from other LI types
    }
  }
};

module.exports = whenSchema;
