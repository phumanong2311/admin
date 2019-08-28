import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.gallery.on('get-galleries', (data) => {
    self.data.setGallery(data)
  })

  self.api.gallery.on('update-gallery', data => {
    return updateGalleries(self, data)
  })

  self.api.gallery.on('insert-gallery', data => {
    self.data.setGallery(obj => {
      let old = obj || []
      let concat = _.concat(old, data)
      return concat
    })
  })

  self.api.category.on('delete-gallery', data => {
    self.data.setGallery((obj) => {
      _.remove(obj, {
        _id: data
      })
      return obj
    })
  })
}

let updateGalleries = (self, data = {}) => {
  self.data.setGallery(obj => {
    if (!obj) return null
    let index = _.findIndex(obj, (item) => item._id === data._id)
    if (index >= 0) {
      obj[index] = data
    }
    return obj
  })
}
