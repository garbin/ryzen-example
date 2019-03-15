import dynamic from 'next/dynamic'

const ReactLoading = dynamic(import('react-loading'), { ssr: false })
export const Loading = props => (
  <div className='global-loading'>
    <ReactLoading type='spin' color='#E95420' />
    {props.children}
  </div>
)
