import { Router } from 'express';

const app: Router = Router();

app.get('/error', (req, res) => {
  res.send('There\'s an error while verifying.')
})

export default app;