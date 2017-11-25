import express from 'express';
import index from './default.js';
import timeout from './timeout.js';
import resave from './resave.js';
import destroy from './destroy.js';

const router = express.Router();

router.get('/', index);
router.put('/timeout', timeout);
router.get('/regenerate', resave);
router.get('/destroy', destroy);

export default router;
