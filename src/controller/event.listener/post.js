import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.post.on('get-posts', (data) => {
    self.data.setPost(data)
  })

  self.api.post.on('update-post', data => {
    return updatePost(self, data)
  })

  self.api.post.on('delete-post', data => {
    self.data.setPost((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updatePost = (self, data = {}) => {
  self.data.setPost(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
