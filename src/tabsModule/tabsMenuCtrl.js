// -----------------------------------------------------------------------------
// tabsMenuCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

class TabsMenuController {
    static initClass() {
        TabsMenuController.$inject = ['state', 'tabs'];
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
        this._tabs.showTab(tabId);
    }
}

TabsMenuController.initClass();

angular.module('tabsModule').controller('tabsMenuCtrl', TabsMenuController);
