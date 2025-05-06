import { Router } from 'express';
import { currentWeather, minutalPrecip, powerHistoric } from '../controllers/clima';

const router = Router();

router.get('/current', currentWeather);       // ?lat=-34.6&lon=-58.4
router.get('/minute',  minutalPrecip);        // idem
router.get('/historic', powerHistoric);       // ?lat&lon&start=20250101&end=20250131

export default router;
