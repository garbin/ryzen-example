import { router } from 'ryzen'
import { Category } from '../../../models'

export const categories = router.restful(Category, router => router.crud())
