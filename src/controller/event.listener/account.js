import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.account.on('get-accounts', (data) => {
    self.data.setAccount(data)
  })

  self.api.account.on('update-account', data => {
    return updateAccount(self, data)
  })

  self.api.account.on('delete-account', data => {
    self.data.setAccount((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateAccount = (self, data = {}) => {
  self.data.setAccount(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
