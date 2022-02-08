/**
 * Constant variable which saves server default data configuration like Server Urls and endpoints.
 */
export const SERVER = (function () {
  const URL = {
    BASE: 'http://localhost:8080/api',
    BASE2: 'http://localhost:8080/api'
  };
  const LOGIN = 'oauth/token';
  const SUCURSAL= 'sucursal';

  return {
    URL_BASE: URL.BASE,
    LOGIN: `${URL.BASE2}/${LOGIN}`,
    SUCURSAL: `${URL.BASE2}/${SUCURSAL}`,
  };
})();


