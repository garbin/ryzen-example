import { Model } from 'ryzen'
import { Comment } from './comment'
import { Category } from './category'
import { post } from '../shared/validators'

export class Post extends Model {
  static get tableName () { return 'posts' }
  static get validator () { return post }
  static get relations () {
    return {
      comments: this.hasMany(Comment),
      categories: this.manyToMany(Category, { throughTable: 'category2post' })
    }
  }
}
