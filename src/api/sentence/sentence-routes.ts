import { Router } from 'express';

import { Services } from '../../services/services';
import { GenerateCrudRoutes } from '../../utils/crud/route-generator';

const sentences = () => Services.instance().sentenceService;
const router = Router();
router.use('/', GenerateCrudRoutes(sentences));

export default router;
