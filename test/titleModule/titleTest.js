describe('title', () => {
    // Note: title service is initialized by modules run function
    let state = null;
    const urlParamsMock = {
        getParam(paramName) {
            if (paramName === 'product') {
                return 'Conan the Barbarian';
            } else {
                return null;
            }
        }
    };

    beforeEach(() => {
        module('testAppModule');
        module('titleModule');
        module(($provide) => {
            $provide.value('urlParams', urlParamsMock);
        });
        inject(($injector) => {
            state = $injector.get('state');
        });
    });

    it('should set title in state from url parameter', () => {
        expect(state.getParam('title')).toBe('Conan the Barbarian');
    });
});
