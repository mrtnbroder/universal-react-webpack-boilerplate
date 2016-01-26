
//
// Client Web API
//

const API_URL = '/api/v1'

export const fetchTodos = () => fetch(`${API_URL}/todos`).then((r) => r.json())
