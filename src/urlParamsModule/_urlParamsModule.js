// -----------------------------------------------------------------------------
// urlParamsModule is for reading search params from url.
// -----------------------------------------------------------------------------

angular.module('urlParamsModule', []);

angular.module('urlParamsModule').config(($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
