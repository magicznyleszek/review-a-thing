// -----------------------------------------------------------------------------
// reviewFormModule is for managing review form inputs.
// -----------------------------------------------------------------------------

angular.module('reviewFormModule', [
    'fieldsModule',
    'tabsModule'
]);

angular.module('reviewFormModule').run(['reviewFormChecker', angular.noop]);
