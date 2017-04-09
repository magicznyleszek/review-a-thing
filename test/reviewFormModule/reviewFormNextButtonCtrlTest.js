describe('reviewFormNextButtonCtrl', () => {
    let reviewFormNextButtonCtrl = null;
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('reviewFormModule');
        inject(($injector, $controller) => {
            reviewFormNextButtonCtrl = $controller('reviewFormNextButtonCtrl');
            appActions = $injector.get('appActions');
        });
    });

    it('should be visible if state property is true', () => {
        expect(reviewFormNextButtonCtrl.isVisible).toBeTruthy();
    });
});
