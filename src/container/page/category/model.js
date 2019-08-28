
var model = {
  model: function () {
    return {
      img: {
        validators: [
          { compare: 'required' }
        ]
      },
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' },
          { compare: 'minlen', compareTo: 6 }
        ]
      },
      description: {
        label: 'Description',
        validators: []
      },
      isActive: {
        text: 'Active'
      },
      isHome: {
        text: 'Show HomePage'
      }
    }
  }
}

module.exports = model
