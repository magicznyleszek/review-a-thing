// -----------------------------------------------------------------------------
// titleCtrl -- handles displaying a title.
// -----------------------------------------------------------------------------

class TitleCtrl {
    static initClass() {
        TitleCtrl.$inject = ['state'];
    }

    constructor(state) {
        this._state = state;
        this._state.registerStateObserver(this._onStateChange.bind(this));

        this.text = null;

        // get initial state
        this._onStateChange();
    }

    _onStateChange() {
        this.text = this._state.getParam('title');
    }
}

TitleCtrl.initClass();

angular.module('titleModule').controller('titleCtrl', TitleCtrl);
