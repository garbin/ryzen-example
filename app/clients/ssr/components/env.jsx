import NextLink from '../routes'

export const Link = ({ href, route, params, as, children, ...props }) => (
  <NextLink href={href} route={route} params={params} as={as}>
    <a {...props}>{children}</a>
  </NextLink>
)
