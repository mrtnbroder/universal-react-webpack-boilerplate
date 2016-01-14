
const API_URL = '/api/v1'

//
// API Middleware
//

export default function(app) {
  // Define API Endpoints here
  app.get(`${API_URL}/users`, (res, req, next) => next())
}
