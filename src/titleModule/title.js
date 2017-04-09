// -----------------------------------------------------------------------------
// title is a service for connecting url param with state.
// -----------------------------------------------------------------------------

class TitleService {
    static initClass() {
        TitleService.$inject = ['reviewStore', 'reviewActions', 'urlParams'];
    }

    constructor(reviewStore, reviewActions, urlParams) {
        // set initial title state from url params
        reviewActions.setProductTitle(urlParams.getParam('product'));
    }
}

TitleService.initClass();

angular.module('titleModule').service('title', TitleService);
