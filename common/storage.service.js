//const ID_TOKEN_KEY = 'stringee_user_portals';

export default {
  get(key) {
    var dataString = window.localStorage.getItem(key);
    return dataString;
  },

  save(key, data) {
    window.localStorage.setItem(key, data);
  },

  destroy(key) {
    window.localStorage.removeItem(key);
  }
}
