import express from 'express';
import InviteCodesController from '../controllers/inviteCodes';

const router = express.Router();


router.post('/createInviteCode', InviteCodesController.createInviteCodes);
router.put('/deleteInviteCode', InviteCodesController.disableInviteCodes);
router.put('/checkInviteCode', InviteCodesController.checkInviteCodes);


export default router;