import express from 'express';
import index from './default.js';
import timeout from './timeout.js';

const router = express.Router();

router.get('/', index);
router.put('/timeout', timeout);

export default router;
