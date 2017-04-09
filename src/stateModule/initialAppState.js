angular.module('stateModule').constant('initialAppState', {
    productTitle: null,
    currentStepId: null,
    steps: new Map([
        ['form', {
            name: 'Step 1',
            isVisibleInMenu: true,
            isUnlocked: false,
            isErrorVisible: false
        }],
        ['socials', {
            name: 'Step 2',
            isVisibleInMenu: true,
            isUnlocked: false
        }],
        ['summary', {
            name: 'Step 3',
            isVisibleInMenu: true,
            isUnlocked: false
        }],
        ['final', {
            name: null,
            isVisibleInMenu: false,
            isUnlocked: false
        }]
    ]),
    fields: {
        yourName: {
            value: null,
            isRequired: true,
            validityType: 'text',
            isValid: null
        },
        title: {
            value: null,
            isRequired: false,
            isValid: null
        },
        reviewText: {
            value: null,
            isRequired: true,
            validityType: 'text',
            isValid: null
        },
        stars: {
            value: null,
            isRequired: true,
            validityType: 'rating',
            isValid: null
        }
    },
    socials: {
        facebook: null,
        twitter: null,
        linkedIn: null
    }
});
