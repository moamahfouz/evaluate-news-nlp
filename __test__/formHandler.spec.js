// this fixes the ReferenceError: regeneratorRuntime is not defined issue
// see https://spectrum.chat/jest/general/referenceerror-regeneratorruntime-is-not-defined~b3ef9b65-87cd-4e27-9730-f90b6eeff155
import 'regenerator-runtime/runtime';

import  {handleSubmit, displayErrors,  clearErrors, updateUI, showPreloader}  from '../src/client/js/formHandler';

// handleSubmit
describe('handleSubmit', () => {
    test('It should exist as a function', () => {
            expect(handleSubmit).toBeDefined();
    });

});

// displayErrors
describe('displayErrors', () => {
    test('It should exist as a function', () => {
            expect(displayErrors).toBeDefined();
    });

});


// clearErrors
describe('clearErrors', () => {
    test('It should exist as a function', () => {
            expect(clearErrors).toBeDefined();
    });

});


// updateUI
describe('updateUI', () => {
    test('It should exist as a function', () => {
            expect(updateUI).toBeDefined();
    });

});

// showPreloader
describe('showPreloader', () => {
    test('It should exist as a function', () => {
            expect(showPreloader).toBeDefined();
    });

});
