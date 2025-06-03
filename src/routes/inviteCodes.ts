import express from 'express';
import InviteCodesController from '../controllers/inviteCodes';

const router = express.Router();


router.post('/createInviteCode', InviteCodesController.createInviteCodes);
router.delete('/deleteInviteCode', InviteCodesController.disableInviteCodes);
router.post('/checkInviteCode', InviteCodesController.checkInviteCodes);
router.get('/getActiveInviteCode', InviteCodesController.getActiveInviteCode);

export default router;