// -----------------------------------------------------------------------------
// tabs is a service for changing current and unlocking tabs.
// -----------------------------------------------------------------------------

class TabsService {
    static initClass() {
        TabsService.initialTabsState = [
            {
                id: 's1',
                name: 'Step 1',
                isUnlocked: false,
                isVisible: false
            },
            {
                id: 's2',
                name: 'Step 2',
                isUnlocked: false,
                isVisible: false
            },
            {
                id: 's3',
                name: 'Step 3',
                isUnlocked: false,
                isVisible: false
            }
        ];

        TabsService.$inject = ['state'];
    }

    constructor(state) {
        this._state = state;
        // set initial tabs state
        this._state.setParam('tabs', TabsService.initialTabsState);
    }

    hideTabs() {
        const currentState = this._state.get();
        const tabsData = currentState.tabs;
        for (const tab of tabsData) {
            this._changeTabProperty(tab.id, 'isVisible', false);
        }
    }

    showTab(tabId) {
        const currentState = this._state.get();
        const tabsData = currentState.tabs;
        for (const tab of tabsData) {
            if (tab.id === tabId) {
                this._changeTabProperty(tab.id, 'isVisible', true);
            } else {
                this._changeTabProperty(tab.id, 'isVisible', false);
            }
        }
    }

    lockTab(tabId) {
        this._changeTabProperty(tabId, 'isUnlocked', false);
    }

    unlockTab(tabId) {
        this._changeTabProperty(tabId, 'isUnlocked', true);
    }

    _changeTabProperty(tabId, propertyName, propertyValue) {
        const currentState = this._state.get();
        const tabsData = currentState.tabs;
        for (const tab of tabsData) {
            if (tab.id === tabId) {
                tab[propertyName] = propertyValue;
                break;
            }
        }
        this._state.setParam('tabs', tabsData);
    }
}

TabsService.initClass();

angular.module('tabsModule').service('tabs', TabsService);
