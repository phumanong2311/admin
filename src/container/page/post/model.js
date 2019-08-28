
var model = {
  model: function () {
    return {
      image: {
        validators: [
          { compare: 'required' }
        ]
      },
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' }
        ]
      },
      introTitle: {
        label: 'Intro Title',
        placeholder: 'please input intro title',
        validators: [
          { compare: 'required' }
        ]
      },
      categoryPostId: {
        label: 'Category post',
        validators: []
      },
      description: {
        label: 'Description',
        validators: []
      },
      content: {
        label: 'Content',
        validators: []
      },
      isActive: {
        text: 'Active'
      }
    }
  }
}

module.exports = model
