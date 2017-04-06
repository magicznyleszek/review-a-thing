// -----------------------------------------------------------------------------
// titleCtrl -- handles displaying a title.
// -----------------------------------------------------------------------------

class TitleController {
    static initClass() {
        TitleController.$inject = ['state'];
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

TitleController.initClass();

angular.module('titleModule').controller('titleCtrl', TitleController);
