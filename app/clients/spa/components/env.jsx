import { Link as ReactRouterLink } from 'react-router-dom'
export const Link = ({ href, ...props }) => (
  <ReactRouterLink to={href} {...props} />
)
