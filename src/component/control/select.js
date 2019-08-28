import React from 'react'

class Select extends React.PureComponent {
  render () {
    let {isSelected, classSelect, onChange, options} = this.props
    let opts = options || []
    return (
      <select className={'form-control ' + classSelect} style={{ width: '100%' }} onChange={onChange}>
        <option value=''>--choose--</option>
        {
          opts.map((el, index) => {
            return (
              isSelected === el.value
                ? <option selected value={el.value} key={index}>{el.text}</option>
                : <option value={el.value} key={index}>{el.text}</option>
            )
          })
        }
      </select>
    )
  }
}

export default Select
