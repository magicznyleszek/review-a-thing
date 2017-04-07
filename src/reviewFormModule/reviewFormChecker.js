// -----------------------------------------------------------------------------
// reviewFormChecker is a service for managing first tab state.
// -----------------------------------------------------------------------------

class ReviewFormCheckerService {
    static initClass() {
        ReviewFormCheckerService.tabId = 's1';
        ReviewFormCheckerService.nextTabId = 's2';
        ReviewFormCheckerService.$inject = ['state', 'tabs'];
    }

    constructor(state, tabs) {
        this._state = state;
        this._tabs = tabs;

        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();

        // show first tab
        this._tabs.showTab(ReviewFormCheckerService.tabId);
    }

    _onStateChange() {
        const textFieldsState = this._state.getParam('textFields');

        if (textFieldsState !== null) {
            this._tabs.unlockTab(ReviewFormCheckerService.tabId);
            if (
                typeof textFieldsState.yourName !== 'undefined' &&
                textFieldsState.yourName.isValid === true &&
                typeof textFieldsState.review !== 'undefined' &&
                textFieldsState.review.isValid === true
            ) {
                this._tabs.unlockTab(ReviewFormCheckerService.nextTabId);
            } else {
                this._tabs.lockTab(ReviewFormCheckerService.nextTabId);
            }
        }
    }
}

ReviewFormCheckerService.initClass();

angular.module('reviewFormModule').service(
    'reviewFormChecker',
    ReviewFormCheckerService
);
