import React from 'react'
import {Link} from 'react-router-dom'

class FormLayoutDefault extends React.PureComponent {
  render () {
    let {title, linkCancleBtn, textCancleBtn, textSaveBtn, isFormValid, hasChanged, handleSubmit, className, isSubmit} = this.props
    return (
      <React.Fragment>
        <section className='content'>
          <div className='row'>
            <div className={className || 'col-md-8'}>
              <div className='box box-success'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>{title || 'Create'}</h3>
                </div>
                {this.props.children}
              </div>
              {isSubmit && <div className='box box-success'>
                <div className='box-body'>
                  <div className='pull-left'>
                    <Link to={linkCancleBtn} className='btn btn-danger btn-xs'>{textCancleBtn || 'Cancle'}</Link>
                  </div>
                  <div className='pull-right'>
                    <input
                      className='btn btn-success btn-xs'
                      disabled={!isFormValid || (!hasChanged)}
                      type='submit'
                      defaultValue={textSaveBtn || 'Save'}
                      onClick={handleSubmit} />
                  </div>
                  <div className='clearfix' />
                </div>
              </div>
              }
            </div>
            <div className='col-md-4' />
          </div>
        </section>

      </React.Fragment>
    )
  }
}

export default FormLayoutDefault
