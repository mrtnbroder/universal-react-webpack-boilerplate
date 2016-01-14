
//
// API Middleware
//

import API from '../../shared/utils/API'

export default function(app) {
  // Define API Endpoints here
  app.use(API.todos, (req, res) => res.status(200).json(todos))
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
  }
]
