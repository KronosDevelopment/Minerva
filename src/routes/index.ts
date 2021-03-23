import { Router } from 'express';
import VerificationRoute from './v1/VerificationRoute';
import ErrorRoute from './v1/ErrorRoute';
const r: Router = Router();

r.use('/verify', VerificationRoute);
r.use('/error', ErrorRoute);

export default r;
