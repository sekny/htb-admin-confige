import axios from 'axios'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        addinfo3: 'dfsafsdf',
        client_id: '136CBC82B5B54239LEEF79BF30803BD7',
        client_secret: '9f8b5c2789e7484vhfu4udjj484e436c94567acb12ef63e523450b13fdc86baeb04',
        'x-api-key': '10AB89B75C1A4B36B5F7D1C71F17C7C1'
        // baseUrl: 'http://10.215.117.196:8080',
        // clientId: '136CBC82B5B54239LEEF79BF30803BD7',
        // clientSecret: '9f8b5c2789e7484vhfu4udjj484e436c94567acb12ef63e523450b13fdc86baeb04',
        // apiKey: '10AB89B75C1A4B36B5F7D1C71F17C7C1'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // request interception
    instance.interceptors.request.use(config => {
      // Add global loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // It is not recommended to open because the interface is not friendly
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // Response interception
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    console.log(options)
    return instance(options)
  }
}
export default HttpRequest
