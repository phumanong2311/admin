import React from 'react'

import Model from './model'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import { withContainer } from '../../../context'
import FormLayoutDefault from '../../../component/form/layout/default'
import config from '../../../../config'

let domain = config.server.domain

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (id) {
    this.props.api.gallery.delete({ id }, (err) => {
      if (err) alert('remove image fail!!!')
    })
  }

  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    this.props.api.file.upload(true, files, name, folder, (err, resp) => {
      if (err) return
      const dt = resp.map(item => {
        return { image: item.img, isActive: true }
      })
      this.props.api.gallery.insert({ data: dt })
    })
  }
  render () {
    let { image } = this.props.model
    let galleries = this.props.galleries || []
    return (
      <FormLayoutDefault
        className='col-md-12'
        title='Create Category'
        linkCancleBtn='/category'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>
            {/* <div className='box-body box-profile' style={{ width: '400px' }}>
              <h3 className='profile-username text-center'>Images</h3>
            </div> */}
          </div>

          <div className='box-body'>
            <div className='timeline-item'>
              <Field field={image}>
                <div className='upload-image' style={{ width: '200px' }}>
                  <button className='btn btn-block btn-success'>Upoload New Image</button>
                  <input data-name='image' data-folder='gallery' multiple id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
              <span className='time'><i className='fa fa-clock-o' /> 2 days ago</span>

              <h3 className='timeline-header'><a href='#'>Mina Lee</a> uploaded new photos</h3>

              <div className='timeline-body'>
                {galleries.map(gallery => <a><img width='150' src={`${domain}/${gallery.image}`} alt='...' className='margin' /><i onClick={() => this.handleRemove(gallery._id)} className='fa fa-remove' /></a>)}
              </div>
            </div>

          </div>
        </form>

      </FormLayoutDefault>
    )
  }
}

const FormBox = withContainer(withFormBehaviors(Form, Model), (c, props) => ({
  galleries: c.data.gallery
}))

class FormWrapper extends React.PureComponent {
  componentDidMount () {
    this.props.api.gallery.getAll({})
  }
  render () {
    return <FormBox {...this.props} />
  }
}
export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
