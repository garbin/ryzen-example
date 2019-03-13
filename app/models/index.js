import { Model } from 'ryzen'
import Knex from 'knex'
import knexConfig from '../../deploy/database/knexfile'

const knex = Knex(knexConfig)
Model.knex(knex)

export * from './post'
export * from './comment'
export * from './category'
export { knex }
