
//
// REST /todos
//

const OK = 200

export default (router) => {
  router.route('/:todoId')
    // .post((req, res) => {})
    .get(({ params: { todoId } }, res) => res.status(OK).json(todos.filter((t) => t.id === +todoId)[0]))
    // .put((req, res) => {})
    // .delete((req, res) => {})

  router.route('/')
    // .post((req, res) => {})
    .get((req, res) => res.status(OK).json(todos))
    // .put((req, res) => {})
    // .delete((req, res) => {})
}

const todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false
  },
  {
    userId: 2,
    id: 4,
    title: 'feels good man',
    completed: true
  }
]
