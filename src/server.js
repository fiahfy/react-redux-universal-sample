import 'babel-polyfill'
import Koa from 'koa'
import koaConvert from 'koa-convert'
import koaStatic from 'koa-static'
import koaBodyParser from 'koa-bodyparser'
import routes from './server/routes'

const app = new Koa()

app.use(koaConvert(koaStatic('public')))
app.use(koaBodyParser());
app.use(routes)
app.listen(3000, () => {
  console.log('Server started: http://localhost:3000/') // eslint-disable-line no-console
})
