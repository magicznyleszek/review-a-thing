describe('starsField', () => {
    let appStore = null;
    let $compile = null;
    let $componentController = null;
    let scope = null;

    beforeEach(() => {
        module('testAppModule');
        module('fieldsModule');
        inject(($injector, $rootScope) => {
            appStore = $injector.get('appStore');
            $compile = $injector.get('$compile');
            $componentController = $injector.get('$componentController');
            scope = $rootScope.$new();
        });
    });

    const getComponent = (html) => {
        const component = $compile(angular.element(html))(scope);
        scope.$digest();
        return component;
    };

    const getComponentCtrl = (attrs) => {
        return $componentController('starsField', {
            $scope: {},
            $element: '<stars-field></stars-field>',
            $attrs: attrs
        });
    };

    it('should throw error if required name attr not provided', () => {
        expect(() => {getComponent('<stars-field></stars-field>');}).toThrow();
    });

    it('should display label in span', () => {
        const component = getComponent('<stars-field name="stars" label="Rating"></stars-field>');
        expect(component.find('span').text()).toBe('Rating');
    });

    it('should save value to state on star click', () => {
        const compCtrl = getComponentCtrl({name: 'stars'});
        compCtrl.setValue(3);
        const state = appStore.getState();
        expect(state.fields.stars.value).toBe(3);
    });

    describe('getStarText', () => {
        it('should be full for star within range', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            compCtrl.setValue(3);
            expect(compCtrl.getStarText(3)).toBe('★');
        });

        it('should be empty for star outside of range', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            compCtrl.setValue(3);
            expect(compCtrl.getStarText(4)).toBe('☆');
        });

        it('should be empty for null value', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            expect(compCtrl.getStarText(1)).toBe('☆');
        });
    });

    describe('getValidModifier', () => {
        it('should return "valid" for valid field', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            compCtrl._isValid = true;
            expect(compCtrl.getValidModifier()).toBe('valid');
        });

        it('should return "error" for invalid field', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            compCtrl._isValid = false;
            expect(compCtrl.getValidModifier()).toBe('error');
        });

        it('should return empty string for virgin field', () => {
            const compCtrl = getComponentCtrl({name: 'stars', required: ''});
            expect(compCtrl.getValidModifier()).toBe('');
        });
    });
});
