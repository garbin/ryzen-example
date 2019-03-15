import { Link as RouteLink } from '../routes'

export const Link = ({ href, route, params, as, children, ...props }) => (
  <RouteLink href={href} route={route} params={params} as={as}>
    <a {...props}>{children}</a>
  </RouteLink>
)
