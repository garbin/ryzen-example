import React from 'react'
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
export class List extends React.Component {
  render () {
    const { posts = [] } = this.props
    return (
      <div>
        {posts.map((post, idx) => <Post key={idx} post={post} />)}
      </div>
    )
  }
}
