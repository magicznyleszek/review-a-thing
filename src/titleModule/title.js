// -----------------------------------------------------------------------------
// title is a service for connecting url param with state.
// -----------------------------------------------------------------------------

class TitleService {
    static initClass() {
        TitleService.$inject = ['state', 'urlParams'];
    }

    constructor(state, urlParams) {
        // set initial title state from url params
        state.setParam('title', urlParams.getParam('product'));
    }
}

TitleService.initClass();

angular.module('titleModule').service('title', TitleService);
