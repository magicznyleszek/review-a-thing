// -----------------------------------------------------------------------------
// stepsModule is for displaying steps.
// -----------------------------------------------------------------------------

angular.module('stepsModule', [
    'stateModule'
]);

angular.module('stepsModule').run(['appActions', (appActions) => {
    // will display first step
    appActions.tryGoNextStep();
}]);
