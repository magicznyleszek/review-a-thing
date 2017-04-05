// -----------------------------------------------------------------------------
// tabsCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

class TabsMenuCtrl {
    static initClass() {
        TabsMenuCtrl.$inject = ['state', 'tabs'];
    }

    constructor(state, tabs) {
        this._state = state;
        this._tabs = tabs;

        this._state.registerStateObserver(this._onStateChange.bind(this));

        this.options = {};

        // get initial state
        this._onStateChange();
    }

    _onStateChange() {
        this.options = this._state.getParam('tabs');
    }

    showTab(tabId) {
        for (const tab of this.options) {
            if (tab.id === tabId) {
                this._tabs.showTab(tab.id);
            } else {
                this._tabs.hideTab(tab.id);
            }
        }
    }
}

TabsMenuCtrl.initClass();

angular.module('tabsModule').controller('tabsMenuCtrl', TabsMenuCtrl);
