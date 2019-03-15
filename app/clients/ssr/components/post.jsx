import React from 'react'
import { Link } from './env'

export class Post extends React.Component {
  render () {
    const { post } = this.props
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.contents}</p>
      </div>
    )
  }
}

export class Item extends React.Component {
  render () {
    const { post } = this.props
    return (
      <div>
        <h3>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
      </div>
    )
  }
}
export class List extends React.Component {
  render () {
    const { posts = [] } = this.props
    return (
      <div>
        {posts.map((post, idx) => <Item key={idx} post={post} />)}
      </div>
    )
  }
}
