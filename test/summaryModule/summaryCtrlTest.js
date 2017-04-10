describe('summaryCtrl', () => {
    let summaryCtrl = null;
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('summaryModule');
        inject(($injector, $controller) => {
            summaryCtrl = $controller('summaryCtrl');
            appActions = $injector.get('appActions');
        });
    });

    it('should display a nice starLabel', () => {
        appActions.setField('stars', 3);
        expect(summaryCtrl.starsLabel).toBe('★★★');
        appActions.setField('stars', 1);
        expect(summaryCtrl.starsLabel).toBe('★');
        appActions.setField('stars', 5);
        expect(summaryCtrl.starsLabel).toBe('★★★★★');
    });

    it('should set hasAnySocialsToShareOn to true if any is true', () => {
        appActions.setField('facebook', true);
        expect(summaryCtrl.hasAnySocialsToShareOn).toBeTruthy();
    });

    it('should set hasAnySocialsToShareOn to false if none is true', () => {
        appActions.setField('facebook', false);
        appActions.setField('twitter', false);
        appActions.setField('linkedIn', false);
        expect(summaryCtrl.hasAnySocialsToShareOn).toBeFalsy();
    });
});
