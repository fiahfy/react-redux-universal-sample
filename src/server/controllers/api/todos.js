export default function (ctx) {
  global.todos = global.todos || [];

  const method = ctx.request.method;
  switch (method) {
    case 'GET':
      ctx.body = global.todos;
      break;
    case 'POST': {
      const id = (new Date()).getTime();
      global.todos.push({
        id,
        text: ctx.request.body.text,
      });
      ctx.status = 201;
      ctx.body = { id };
      break;
    }
    case 'PUT': {
      const id = +ctx.params.id;
      global.todos = global.todos.map((todo) => {
        if (todo.id === id) {
          const newTodo = Object.assign({}, todo);
          newTodo.text = ctx.request.body.text;
          return newTodo;
        }
        return todo;
      });
      ctx.status = 204;
      break;
    }
    case 'DELETE': {
      const id = +ctx.params.id;
      global.todos = global.todos.filter(todo => todo.id !== id);
      ctx.status = 204;
      break;
    }
    default:
      ctx.status = 405;
      break;
  }
}
