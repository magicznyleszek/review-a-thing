// -----------------------------------------------------------------------------
// reviewFormNextButtonCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

class ReviewFormNextButtonController {
    static initClass() {
        ReviewFormNextButtonController.tabId = 's1';
        ReviewFormNextButtonController.nextTabId = 's2';
        ReviewFormNextButtonController.$inject = ['state', 'tabs'];
    }

    constructor(state, tabs) {
        this._state = state;
        this._tabs = tabs;
    }

    tryGoNext() {
        this._tabs.unlockTab(ReviewFormNextButtonController.tabId);

        const tabsState = this._state.getParam('tabs');

        for (const tab of tabsState) {
            if (tab.id === ReviewFormNextButtonController.nextTabId) {
                if (tab.isUnlocked) {
                    this._tabs.showTab(
                        ReviewFormNextButtonController.nextTabId
                    );
                }
            }
        }
    }
}

ReviewFormNextButtonController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormNextButtonCtrl',
    ReviewFormNextButtonController
);
