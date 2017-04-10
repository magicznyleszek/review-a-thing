// -----------------------------------------------------------------------------
// productReviewAppModule is our single ngApp module for whole web app
// -----------------------------------------------------------------------------

angular.module('productReviewAppModule', [
    'fieldsModule',
    'titleModule',
    'stepsModule',
    'reviewFormModule',
    'summaryModule'
]);

angular.module('productReviewAppModule').run(['appActions', (appActions) => {
    // will display first step on app init
    appActions.tryGoNextStep();
}]);
