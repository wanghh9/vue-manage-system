import axios from 'axios'

let base = ''
export default {

  // getCustomer: function (params) {
  //   return axios.get(`${base}/api/customer` + params.url, {
  //     timeout: 5000
  //   }).then(res => res.data).catch(e => e)
  // },
  //
  // adcirclepoolexplotisP: function (params) {
  //   return axios.post(`${base}/api/adcirclepoolexplotis`, params)
  //     .then(res => res.data).catch(e => e)
  // },

  ossCompressUpload: function (formData) {
    return axios({
        method: 'POST',
        url: `${base}/api/ossCompressUpload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => res.data).catch(e => e)
  },

  // getVirtualRoleList: function (params) {
  //   return axios.get(`${base}/api/getVirtualRoleList`, {
  //     params: {
  //       url: params.url
  //     }
  //   }).then(res => res.data).catch(e => e)
  // },


}