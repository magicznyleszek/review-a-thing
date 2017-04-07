// -----------------------------------------------------------------------------
// tabsContentCtrl -- handles displaying tabs content.
// -----------------------------------------------------------------------------

class TabsContentController {
    static initClass() {
        TabsContentController.$inject = ['state'];
    }

    constructor(state) {
        this._state = state;
        this.areTabsVisible = {};
        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();
    }

    _onStateChange() {
        const tabsState = this._state.getParam('tabs');

        for (const tab of tabsState) {
            this.areTabsVisible[tab.id] = tab.isVisible;
        }
    }
}

TabsContentController.initClass();

angular.module('tabsModule').controller(
    'tabsContentCtrl',
    TabsContentController
);
