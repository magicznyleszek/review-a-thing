// -----------------------------------------------------------------------------
// titleCtrl -- handles displaying a title.
// -----------------------------------------------------------------------------

class TitleController {
    static initClass() {
        TitleController.$inject = ['appStore'];
    }

    constructor(appStore) {
        this.text = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _onStateChange(state) {
        this.text = state.productTitle;
    }
}

TitleController.initClass();

angular.module('titleModule').controller('titleCtrl', TitleController);
