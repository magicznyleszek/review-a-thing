describe('titleCtrl', () => {
    let reviewActions = null;
    let titleCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('titleModule');
        inject(($injector, $controller) => {
            titleCtrl = $controller('titleCtrl');
            reviewActions = $injector.get('reviewActions');
        });
    });

    it('should use title from state', () => {
        reviewActions.setProductTitle('Silent Running');
        expect(titleCtrl.text).toBe('Silent Running');
    });
});
