// -----------------------------------------------------------------------------
// urlParams reads window location search params
// -----------------------------------------------------------------------------

class UrlParamsService {
    static initClass() {
        UrlParamsService.$inject = ['$location'];
    }

    constructor($location) {
        this._$location = $location;
    }

    getParam(paramName) {
        const searchParams = this._$location.search();
        if (typeof searchParams[paramName] === 'undefined') {
            return null;
        } else {
            return searchParams[paramName];
        }
    }
}

UrlParamsService.initClass();

angular.module('urlParamsModule').service('urlParams', UrlParamsService);
