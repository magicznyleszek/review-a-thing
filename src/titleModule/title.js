// -----------------------------------------------------------------------------
// title is a service for connecting url param with state.
// -----------------------------------------------------------------------------

class TitleService {
    static initClass() {
        TitleService.$inject = ['appStore', 'appActions', 'urlParams'];
    }

    constructor(appStore, appActions, urlParams) {
        // set initial title state from url params
        appActions.setProductTitle(urlParams.getParam('product'));
    }
}

TitleService.initClass();

angular.module('titleModule').service('title', TitleService);
