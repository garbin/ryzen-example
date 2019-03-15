import ReactLoading from 'react-loading'

export const Loading = props => (
  <div className='global-loading'>
    <ReactLoading type='spin' color='#E95420' />
    {props.children}
  </div>
)
