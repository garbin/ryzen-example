import { Model } from 'ryzen'
import { Post } from './post'
import { category } from '../shared/validators'

export class Category extends Model {
  static get tableName () { return 'categories' }
  static get validator () { return category }
  static get relations () {
    return {
      posts: this.manyToMany(Post, { throughTable: 'category2post' })
    }
  }
  static get timestamps () { return false }
}
