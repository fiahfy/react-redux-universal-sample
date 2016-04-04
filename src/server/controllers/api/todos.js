export default async function (ctx) {
  global.todos = global.todos || []

  const method = ctx.query.__method
  switch (method) {
  case 'GET':
    ctx.body = global.todos
    break
  case 'POST': {
    const id = (new Date).getTime()
    global.todos.push({
      id,
      text: ctx.query.text
    })
    ctx.status = 201
    ctx.body = {id}
    break
  }
  case 'PUT':
    global.todos = global.todos.map(todo => {
      if (todo.id == ctx.query.id) {
        todo.text = ctx.query.text
      }
      return todo
    })
    ctx.status = 204
    break
  case 'DELETE':
    global.todos = global.todos.filter(todo => {
      return todo.id != ctx.query.id
    })
    ctx.status = 204
    break
  }
}
