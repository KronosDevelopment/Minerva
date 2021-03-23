import axios from 'axios';
import { config } from 'dotenv/types';
import { json, Router, urlencoded } from 'express';
import { RecaptchaV3 } from 'express-recaptcha/dist';
import jwt from 'jsonwebtoken';
import main from '../../main';
import { Data } from '../../utils/interfaces';
config({ path: '../../../.env' });

const app: Router = Router();
app.use(json())
app.use(urlencoded({ extended: true }));

const Recaptcha = new RecaptchaV3(process.env.PUBLIC_KEY as string, process.env.PRIVATE_KEY as string);

let data:Data;

app.get('/verify', Recaptcha.middleware.render, (req, res) => {
  if (req.query && req.query.session) {
    try {
      data = jwt.verify(req.query.session as string, process.env.SECRET as string) as Data;
    } catch (err) {
      res.json({
        error: 1,
        status: 'failed',
        data: 'Token expired or invalid.'
      });
    }
    res.render('verify', { captcha:res.recaptcha })
  } else {
    res.json({
      error: 1,
      status: 'failed',
      data: 'unacceptable GET request'
    })
  }
})

app.post('/verify', Recaptcha.middleware.verify, (req, res) => {
  if (!req.recaptcha?.error) {
    let ip = req.ip;
    axios({
      method: 'get',
      url: `https://ip-api.com/json/${ip}?fields=proxy,hosting`
    }).then((r) => {
      if (r.data.success) {
        if (r.data.proxy || r.data.hosting) {
          res.json({
            error: 1,
            status: 'failed',
            data: 'user is using a vpn.'
          });

          res.redirect('/error')

        } else {
          res.json({
            error: 0,
            status: 'success',
            data: 'verifying...'
          })
          main.guilds.cache.get(data.guild)?.members.cache.get(data.discordId)?.roles.add(process.env.VERIFIED_ROLEID as string);
        }
      }
    })
  }
})

export default app;