import dayjs from 'dayjs'
const importFilter = Vue => {
  Vue.filter('label_title', function (value) {
    return value.replace(/_/g, ' ')
  })

  Vue.filter('viewDetailValue', function (value) {
    if (Date.parse(value) > 0) {
      return dayjs(value).format('YYYY-MMM-DD hh:mm A')
    } else {
      return value
    }
  })
}

export default importFilter
