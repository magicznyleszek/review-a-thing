// -----------------------------------------------------------------------------
// titleCtrl -- handles displaying a title.
// -----------------------------------------------------------------------------

class TitleController {
    static initClass() {
        TitleController.$inject = ['reviewStore'];
    }

    constructor(reviewStore) {
        this.text = null;
        reviewStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(reviewStore.getState());
    }

    _onStateChange(state) {
        this.text = state.productTitle;
    }
}

TitleController.initClass();

angular.module('titleModule').controller('titleCtrl', TitleController);
