import { defineMessages, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import enMsg from './en_US.json'
addLocaleData([...en, ...zh])

export function getUserLocale (defaultLocale = 'zh') {
  return window.localStorage.getItem('locale') || defaultLocale
}
export default defineMessages({
  hello: '你好! 世界',
  welcome: '欢迎!'
})
export const messages = { en: enMsg }
