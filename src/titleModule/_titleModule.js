// -----------------------------------------------------------------------------
// titleModule is for displaying a title.
// -----------------------------------------------------------------------------

angular.module('titleModule', [
    'stateModule',
    'urlParamsModule'
]);

angular.module('titleModule').run(['title', angular.noop]);
