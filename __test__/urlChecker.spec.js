
// checkForUrl
import { checkForUrl } from '../src/client/js/urlChecker';

describe('Testing checkForUrl', () => {

  test('It should error when url is null', () => {

    function passNullUrl() {
      checkForUrl(null);
    }

    expect(passNullUrl).toThrow('URL cannot be null');

  });

  test('It should return false if url is invalid', () => {
    let output = false;
    let url = 'hello world';
    expect(checkForUrl(url)).toEqual(output);
  });


  test('It should return true when url is valid', () => {

    let output = true;
    let url = 'https://stackoverflow.com/';

    expect(checkForUrl(url)).toEqual(output);

  });


});

