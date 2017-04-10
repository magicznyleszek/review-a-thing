// -----------------------------------------------------------------------------
// summaryCtrl -- handles displaying summary content.
// -----------------------------------------------------------------------------

class SummaryController {
    static initClass() {
        SummaryController.$inject = ['appStore'];
    }

    constructor(appStore) {
        this.state = appStore.getState();
        this.starsLabel = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _onStateChange(state) {
        this.state = state;
        this.starsLabel = '★'.repeat(state.fields.stars.value);
        this.hasAnySocialsToShareOn = (
            state.fields.facebook.value ||
            state.fields.twitter.value ||
            state.fields.linkedIn.value
        );
    }
}

SummaryController.initClass();

angular.module('summaryModule').controller('summaryCtrl', SummaryController);
