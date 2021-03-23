import { config } from 'dotenv/types';
import express from 'express';
import session from 'express-session';
import { v4 } from 'uuid';
import routes from './routes'
import { Log } from './utils/logging';

config({ path: '../.env' });

const app = express();
app.use(session({
  genid: (req) => {
    return v4();
  },
  secret: process.env.SECRET as string,
  cookie: {
    secure: true,
  },
}))
app.use('/', routes);

app.all('*', (req, res) => {
  res.json({
    error: 1,
    data: 'Invalid endpoint!'
  })
});

app.listen(80, () => {
  Log('Listening on port 80.')
})

export default app;