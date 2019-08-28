
var model = {
    model: function () {
      return {
        avatar: {
          validators: []
        },
        username: {
          label: 'User Name',
          placeholder: 'please input username',
          validators: [
            { compare: 'required' },
            { compare: 'minlen', compareTo: 6 }
          ]
        },
        password: {
            label: 'Password',
            placeholder: 'please input password',
            validators: [
              { compare: 'required' }
            ]
        },
        gender: {
            label: 'Gender',
            options: [{ text: 'Male', value: 1 }, { text: 'Female', value: 2 }]
        },
        address: {
            label: 'Address',
            placeholder: 'please input address',
            validators: []
        },
        phone: {
            label: 'Phone',
            placeholder: 'please input phone',
            validators: [
              { compare: 'required' },
              { compare: 'stringIsNumber' }
            ]
        },
        isActive: {
          text: 'Active'
        }
      }
    }
  }
  
  module.exports = model
  