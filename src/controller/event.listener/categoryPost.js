import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.category.on('get-categories-post', (data) => {
    self.data.setCategoryPost(data)
  })

  self.api.category.on('update-category-post', data => {
    return updateCategoriesPost(self, data)
  })

  self.api.category.on('delete-category-post', data => {
    self.data.setCategoryPost((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateCategoriesPost = (self, data = {}) => {
  self.data.setCategoryPost(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
