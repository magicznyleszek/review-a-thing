describe('tabs', () => {
    let tabs = null;
    let state = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector) => {
            tabs = $injector.get('tabs');
            state = $injector.get('state');
        });
    });

    it('should create initial state for tabs', () => {
        const currentState = state.get();
        expect(currentState.tabs).toBeDefined();
    });

    it('should have all tabs hidden and locked on default ', () => {
        const currentState = state.get();
        for (const tab of currentState.tabs) {
            expect(tab.isVisible).toBeFalsy();
            expect(tab.isUnlocked).toBeFalsy();
        }
    });

    it('should update state properly with showTab', () => {
        let currentState = state.get();
        expect(currentState.tabs[0].isVisible).toBeFalsy();

        tabs.showTab(currentState.tabs[0].id);

        currentState = state.get();
        expect(currentState.tabs[0].isVisible).toBeTruthy();
    });

    it('should update state properly with hideTabs', () => {
        let currentState = state.get();

        tabs.showTab(currentState.tabs[0].id);
        currentState = state.get();
        expect(currentState.tabs[0].isVisible).toBeTruthy();

        tabs.hideTabs();
        currentState = state.get();
        expect(currentState.tabs[0].isVisible).toBeFalsy();
    });

    it('should update state properly with unlockTab', () => {
        let currentState = state.get();
        expect(currentState.tabs[0].isUnlocked).toBeFalsy();

        tabs.unlockTab(currentState.tabs[0].id);

        currentState = state.get();
        expect(currentState.tabs[0].isUnlocked).toBeTruthy();
    });

    it('should update state properly with lockTab', () => {
        let currentState = state.get();

        tabs.unlockTab(currentState.tabs[0].id);
        currentState = state.get();
        expect(currentState.tabs[0].isUnlocked).toBeTruthy();

        tabs.lockTab(currentState.tabs[0].id);
        currentState = state.get();
        expect(currentState.tabs[0].isUnlocked).toBeFalsy();
    });
});
