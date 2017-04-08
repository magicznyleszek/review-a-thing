angular.module('stateModule').constant('initialReviewState', {
    currentStepId: null,
    steps: [
        {
            id: 'review',
            isVisibleInMenu: false,
            isUnlocked: false,
            isErrorVisible: false
        },
        {
            id: 'socials',
            isVisibleInMenu: false,
            isUnlocked: false
        },
        {
            id: 'summary',
            isVisibleInMenu: false,
            isUnlocked: false
        },
        {
            id: 'final',
            isVisibleInMenu: false,
            isUnlocked: false
        }
    ],
    fields: {
        yourName: {
            value: null,
            isRequired: true,
            isValid: null
        },
        title: {
            value: null,
            isRequired: false,
            isValid: null
        },
        review: {
            value: null,
            isRequired: true,
            isValid: null
        },
        stars: {
            value: null,
            isRequired: true,
            isValid: null
        }
    },
    socials: {
        facebook: null,
        twitter: null,
        linkedIn: null
    }
});
