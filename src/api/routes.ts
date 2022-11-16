import { Router } from 'express';

import sentenceRoutes from './sentence/sentence-routes';

const router = Router();
router.use('/sentence', sentenceRoutes);

export default router;
