import { Model } from 'ryzen'
import { Post } from './post'
import { comment } from '../shared/validators'

export class Comment extends Model {
  static get tableName () { return 'comments' }
  static get validator () { return comment }
  static get relations () {
    return {
      post: this.belongsToOne(Post)
    }
  }
}
