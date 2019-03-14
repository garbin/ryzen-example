import dynamic from 'next/dynamic'

const ReactLoading = dynamic(import('react-loading'), { ssr: false })
export default props => (
  <div className='global-loading'>
    <ReactLoading type='spin' color='#E95420' />
    {props.children}
  </div>
)
