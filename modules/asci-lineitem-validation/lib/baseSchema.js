var Joi = require('joi');

var language = require('./en_US/language');

// this attribute-level validation only, the naming here is inspired by the lineitem form
// so it is easy to fetch the validation rule that corresponds with a certain form field
// there are 2 other types of validation levels, refer to the README.md
var baseSchema = {
  'advertiserCpm': Joi
    .number()
    .greater(0)
    .max(1000)
    .precision(2)
    .options({ convert: false, language: language.get('advertiserCpm') }),
  'brandsafeList': Joi
    .object()
    .keys({
      inventoryType: Joi
        .string(),
      hidden: Joi
        .boolean(),
      name: Joi
        .string()
    })
    .options({ language: language.get('brandsafeList') }),
  'budgetCpmType': Joi
    .string()
    .valid('FIXED_CPM', 'COST_PLUS')
    .options({ language: language.get('budgetCpmType') }),
  'costCpm': Joi
    .number()
    .min(0)
    .max(1000)
    .precision(2)
    .options({ convert: false, language: language.get('costCpm') }),
  'costPackages': Joi
    .array()
    .options({ language: language.get('costPackages') }),
  'customTargetsBROWSER': Joi
    .array()
    .includes(Joi
      .string()
      .valid('CHROME', 'FIREFOX', 'IE', 'SAFARI', 'OTHER')
    )
    .options({ language: language.get('customTargetsBROWSER') }),
  'customTargetsCONTEXT_CATEGORY': Joi
    .array()
    .options({ language: language.get('customTargetsCONTEXT_CATEGORY') }),
  'customTargetsDEVICE_TYPE': Joi
    .array()
    .includes(Joi
      .string()
      .valid('PHONE', 'TABLET', 'DESKTOP', 'CONNECTED_TV', 'SET_TOP_BOX', 'CONNECTED_DEVICE')
    )
    .options({ language: language.get('customTargetsDEVICE_TYPE') }),
  'customTargetsDIRECT_PRIORITY': Joi
    .string()
    .valid('1', '2', '3', '4', '5', '6', '7')
    .options({ language: language.get('customTargetsDIRECT_PRIORITY') }),
  'customTargetsDIRECT_PUBLISHER_ID': Joi
    .array()
    .includes(Joi
      .string()
      .regex(/^[0-9A-Za-z-_]{27}$/)
    )
    .options({ language: language.get('customTargetsDIRECT_PUBLISHER_ID') }),
  'customTargetsDIRECT_SITE_ID': Joi
    .array()
    .includes(Joi
      .string()
      .regex(/^[0-9A-Za-z-_]+$/)
    )
    .options({ language: language.get('customTargetsDIRECT_SITE_ID') }),
  'customTargetsFOLD_POSITION': Joi
    .array()
    .options({ language: language.get('customTargetsFOLD_POSITION') }),
  'customTargetsINVENTORY_TYPE': Joi
    .string()
    .valid('APP', 'SITE')
    .options({ language: language.get('customTargetsINVENTORY_TYPE') }),
  'customTargetsMANUAL_WHITELIST': Joi
    .array()
    .notes(['needs custom validation that checks total char length of JSON is < 10 mio?'])
    .includes(Joi
      .string()
      .min(4)
      .regex(/^[0-9a-zA-Z._\-]+$/)
    )
    .options({ language: language.get('customTargetsMANUAL_WHITELIST') }),
  'customTargetsOPERATING_SYSTEM': Joi
    .array()
    .includes(Joi
      .string()
      .valid('ANDROID', 'IOS', 'MAC', 'WINDOWS', 'WINDOWS_PHONE', 'OTHER')
    )
    .options({ language: language.get('customTargetsOPERATING_SYSTEM') }),
  'customTargetsPUB_KEY': Joi
    .array()
    .includes(Joi
      .string()
      .regex(/^\w+=\w+$/)
    )
    .options({ language: language.get('customTargetsPUB_KEY') }),
  'customTargetsPUB_KEY_EXCLUSIONS': Joi
    .array()
    .includes(Joi
      .string()
      .regex(/^\w+=\w+$/)
    )
    .options({ language: language.get('customTargetsPUB_KEY_EXCLUSIONS') }),
  'customTargetsVIEWABILITY': Joi
    .string()
    .valid('', '10', '20', '35', '50', '75')
    .options({ language: language.get('customTargetsVIEWABILITY') }),
  'dataType': Joi
    .string()
    .valid(['FIRST_PARTY', 'THIRD_PARTY', 'MIXED', 'UNTARGETED', 'DISCOVERY'])
    .options({ language: language.get('dataType') }),
  'description': Joi
    .string()
    .min(4)
    .max(100)
    .regex(/^[^/|\"\\\\+]+$/)
    .regex(/^(?!.*~{3,})/)
    .options({ language: language.get('description') }),
  'directCustomPrices': Joi
    .array()
    .includes(
      Joi
        .object()
        .keys({
          provider: Joi.string().valid('DIRECT'),
          customTargetAttribute: Joi.string().valid(['DIRECT_SITE_ID']),
          customTargetValue: Joi.string().regex(/^[0-9A-Za-z-_]+$/),
          costCpm: Joi.number()
        })
    )
    .options({ language: language.get('directCustomPrices') }),
  'dynamicCreativeAlias': Joi
    .string()
    .regex(/^[0-9A-Za-z-_]*$/)
    .options({ language: language.get('dynamicCreativeAlias') }),
  'endDate': Joi
    .number()
    .options({ language: language.get('endDate') }),
  'excludedCities': Joi
    .array()
    .options({ convert: false, language: language.get('excludedCities') }),
  'excludedCountries': Joi
    .array()
    .options({ convert: false, language: language.get('excludedCountries') }),
  'excludedMetros': Joi
    .array()
    .options({ convert: false, language: language.get('excludedMetros') }),
  'excludedRegions': Joi
    .array()
    .options({ convert: false, language: language.get('excludedRegions') }),
  'excludedSegments': Joi
    .array()
    .unique()
    .includes(Joi
      .object()
      .keys({
        segmentId: Joi.string().regex(/^[A-Z]\d{5}_\d{5}$/)
      })
    )
    .options({ convert: false, language: language.get('excludedSegments') }),
  'forcedDelivery': Joi
    .boolean()
    .options({ language: language.get('forcedDelivery') }),
  'formatType': Joi
    .string()
    .valid(['VIDEO', 'DISPLAY', 'SURVEY', 'VIDEO_SSM', 'VIDEO_TBB', 'MOBILE_DISPLAY', 'MOBILE_VIDEO'])
    .options({ language: language.get('formatType') }),
  'frequencyCap': Joi
    .number()
    .integer()
    .options({ language: language.get('frequencyCap') }),
  'frequencyCapGroup': Joi
    .string()
    .options({ language: language.get('frequencyCapGroup') }),
  'frequencyCapUnit': Joi
    .string()
    .valid('', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'LIFETIME')
    .options({ language: language.get('frequencyCapUnit') }),
  'manualBlacklist': Joi
    .object()
    .keys({
      items: Joi
        .array()
        .max(50000)
        .includes(Joi
          .object()
          .keys({
            pattern: Joi
              .string()
              .min(3)
              .max(100)
              .regex(/^([A-Za-z0-9]([A-Za-z0-9\-_]*[A-Za-z0-9])?\.)+[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?$/)
          })
        )
    })
    .example({
      items: [{
        pattern: 'wikipedia.org'
      }, {
        pattern: 'nytimes.org'
      }]
    })
    .options({ language: language.get('manualBlacklist') }),
  'manualExcludedAppIds': Joi
    .object()
    .keys({
      items: Joi
        .array()
        .max(50000)
        .includes(Joi
          .object()
          .keys({
            pattern: Joi
              .string()
              .min(4)
              .regex(/^[0-9a-zA-Z._\-]+$/)
          })
        )
    })
    .example({
      items: [{
        pattern: 'appid.token'
      }, {
        pattern: 'appid.token.2'
      }]
    })
    .options({ language: language.get('manualExcludedAppIds') }),
  'manualIncludedDomains': Joi
    .array()
    .notes(['needs custom validation that checks total char length of JSON is < 10 mio?'])
    .includes(Joi
      .string()
      .min(3)
      .max(100)
      .regex(/^([A-Za-z0-9]([A-Za-z0-9\-_]*[A-Za-z0-9])?\.)+[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?$/)
    )
    .options({ language: language.get('manualIncludedDomains') }),
  'markupCpm': Joi
    .number()
    .min(0)
    .max(2000)
    .precision(2)
    .options({ convert: false, language: language.get('markupCpm') }),
  'markupPercent': Joi
    .number()
    .min(0)
    .max(200)
    .precision(2)
    .options({ convert: false, language: language.get('markupPercent') }),
  'maxBidCpm': Joi
    .number()
    .greater(0)
    .max(1000)
    .precision(2)
    .options({ convert: false, language: language.get('maxBidCpm') }),
  'name': Joi
    .string()
    .min(4)
    .max(100)
    .regex(/^[^/|\"\\\\+]+$/)
    .regex(/^(?!.*~{3,})/)
    .options({ language: language.get('name') }),
  'optimizationBudgetImpressions': Joi
    .number()
    .integer()
    .options({ language: language.get('optimizationBudgetImpressions') }),
  'optimizationType': Joi
    .string()
    .valid(['', 'CTR', 'CPA'])
    .options({ language: language.get('optimizationType') }),
  'prioritizeDeals': Joi
    .boolean()
    .options({ language: language.get('prioritizeDeals') }),
  'productType': Joi
    .string()
    .valid(['PUBLIC', 'PRIVATE', 'DIRECT', 'EXTERNAL'])
    .options({ language: language.get('productType') }),
  'startDate': Joi
    .number()
    .options({ language: language.get('startDate') }),
  'subFormProviders': Joi
    .array()
    .options({ language: language.get('subFormProviders') }),
  'targetCities': Joi
    .array()
    .options({ convert: false, language: language.get('targetCities') }),
  'targetCountries': Joi
    .array()
    .options({ convert: false, language: language.get('targetCountries') }),
  'targetCpa': Joi
    .number()
    .min(0)
    .max(9999)
    .precision(2)
    .options({ convert: false, language: language.get('targetCpa') }),
  'targetCtr': Joi
    .number()
    .min(0)
    .max(9999)
    .precision(2)
    .options({ convert: false, language: language.get('targetCtr') }),
  'targetDayParts': Joi
    .array()
    .unique()
    .includes(Joi
      .object()
      .keys({
        monday: Joi.boolean(),
        tuesday: Joi.boolean(),
        wednesday: Joi.boolean(),
        thursday: Joi.boolean(),
        friday: Joi.boolean(),
        saturday: Joi.boolean(),
        sunday: Joi.boolean(),
        startHour: Joi.number().min(0).max(23),
        endHour: Joi.number().min(1).max(24)
      })
    )
    .options({ convert: false, language: language.get('targetDayParts') }),
  'targetLanguages': Joi
    .array()
    .includes(Joi
      .string()
      .valid('ar', 'en', 'fr', 'de', 'el', 'iw', 'hu', 'pt', 'es')
    )
    .options({ convert: false, language: language.get('targetLanguages') }),
  'targetMetros': Joi
    .array()
    .options({ convert: false, language: language.get('targetMetros') }),
  'targetRegions': Joi
    .array()
    .options({ convert: false, language: language.get('targetRegions') }),
  'targetSegments': Joi
    .array()
    .unique()
    .includes(Joi
      .object()
      .keys({
        segmentId: Joi.string().regex(/^[A-Z]\d{5}_\d{5}$/)
      })
    )
    .options({ convert: false, language: language.get('targetSegments') })
};

module.exports = baseSchema;
