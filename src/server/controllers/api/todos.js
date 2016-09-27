export default async function (ctx) {
  global.todos = global.todos || []

  const method = ctx.request.method
  switch (method) {
    case 'GET':
      ctx.body = global.todos
      break
    case 'POST': {
      const id = (new Date()).getTime()
      global.todos.push({
        id,
        text: ctx.request.body.text,
      })
      ctx.status = 201
      ctx.body = { id }
      break
    }
    case 'PUT':
      global.todos = global.todos.map((todo) => {
        if (todo.id == ctx.params.id) {
          todo.text = ctx.request.body.text
        }
        return todo
      })
      ctx.status = 204
      break
    case 'DELETE':
      global.todos = global.todos.filter((todo) => {
        return todo.id != ctx.params.id
      })
      ctx.status = 204
      break
  }
}
