
const API_URL = 'http://jsonplaceholder.typicode.com'

export const fetchTodos = () => fetch(`${API_URL}/todos`).then((r) => r.json())
