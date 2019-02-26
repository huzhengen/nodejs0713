const send = require('koa-send')
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
	if('/' == ctx.path) return ctx.body = 'try get /package.json'
	await send(ctx, ctx.paht)
})

app.listen(5656)