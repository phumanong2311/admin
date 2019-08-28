
var model = {
  model: function () {
    return {
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' },
          { compare: 'minlen', compareTo: 6 }
        ]
      },
      fate: {
        label: 'fate',
        placeholder: 'please input fate',
        validators: [
          { compare: 'required' },
          { compare: 'stringIsNumber' }
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
