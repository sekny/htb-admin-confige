export default {
  title: 'Admin Vue',
  cookieExpires: 1, // one day
  useI18n: true,
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    // pro: 'https://produce.com'
    dev: 'http://10.215.117.196:8080/payment-service/api/1.0/',
    pro: 'http://10.215.117.196:8080/payment-service/api/1.0/'
  },
  homeName: 'home',
  plugin: {},
  loadingConfig: {
    height: 4,
    failedColor: '#ed4014',
    color: '#F99E19'
  }
}
