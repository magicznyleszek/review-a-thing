describe('appStore', () => {
    let appStore = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            appStore = $injector.get('appStore');
        });
    });

    it('should return state object with getState', () => {
        const state = appStore.getState();
        expect(typeof state).toBe('object');
    });
});
