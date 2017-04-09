// -----------------------------------------------------------------------------
// summaryCtrl -- handles displaying steps content.
// -----------------------------------------------------------------------------

class SummaryController {
    static initClass() {
        SummaryController.$inject = ['appStore'];
    }

    constructor(appStore) {
        this.state = appStore.getState();
        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _onStateChange(state) {
        this.state = state;
    }
}

SummaryController.initClass();

angular.module('summaryModule').controller('summaryCtrl', SummaryController);
