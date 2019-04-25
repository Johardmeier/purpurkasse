import Vue from 'vue'

Vue.filter("numberDiff", value => (value>0 ? '+'+value :(value<0 ? value : '')))
Vue.filter("numberDiff0", value => (value>0 ? '+'+value :(value<0 ? value : '+-')))
Vue.filter("numberSfr", value => {
  let num=parseFloat(value)
  return (num==num.toFixed(0) ? value + '.--' : value)
})

