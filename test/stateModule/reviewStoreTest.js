describe('reviewStore', () => {
    let reviewStore = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            reviewStore = $injector.get('reviewStore');
        });
    });

    it('should return state object with getState', () => {
        const state = reviewStore.getState();
        expect(typeof state).toBe('object');
    });
});
