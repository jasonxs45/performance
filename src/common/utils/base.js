const ORIGIN = 'http://fuxinghuiyu.1juke.cn'
const base = {
  ORIGIN,
  webRoot: process.env.NODE_ENV === 'production' ? '' : ORIGIN,
  BASE_URL: '/Mobile-PostAPI',
  MOCK_URL: 'https://www.easy-mock.com/mock/5abd9851597f2f6d4d73ae18/mock/'
}
export default base
