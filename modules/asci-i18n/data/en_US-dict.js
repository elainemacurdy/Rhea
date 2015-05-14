module.exports = {
  lineitem: {
    daypart: {
      label: 'Day-Part Targeting',
      dayparts: 'Day-Parts',
      labelDays: 'Days',
      labelHours: 'Hours',
      include: 'Add',
      clear: 'Clear',
      includedList: 'Targeted',
      conflict: 'The time range you specified conflicts with that of an existing day part for this line item.',
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
        1: '1AM',
        2: '2AM',
        3: '3AM',
        4: '4AM',
        5: '5AM',
        6: '6AM',
        7: '7AM',
        8: '8AM',
        9: '9AM',
        10: '10AM',
        11: '11AM',
        12: 'Noon',
        13: '1PM',
        14: '2PM',
        15: '3PM',
        16: '4PM',
        17: '5PM',
        18: '6PM',
        19: '7PM',
        20: '8PM',
        21: '9PM',
        22: '10PM',
        23: '11PM',
        24: 'Midnight'
      }
    },
    providers: {
      add: 'Add / Edit Providers...',
      label: 'Providers',
      select: 'Select Providers',
      customCpm: 'Custom CPM',
      dealId: 'Deal ID',
      contentCategory: 'Content Category',
      buyerId: 'Buyer ID'
    },
    publishersplacements: {
      add: 'Add / Edit Publisher Placements...',
      label: 'Publisher Placements',
      select: 'Select Publisher Placements',
      customCpm: 'Custom CPM'
    },
    template: {
      button: 'Apply',
      choose: 'Choose A Template...',
      label: 'Line Item Template',
      select: 'Template'
    }
  }
};
