
//
// Client Web API
//

import API from './API'

export const fetchTodos = () => fetch(API.todos).then((r) => r.json())
