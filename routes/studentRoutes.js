const express = require('express')
const authControllers = require('./../controllers/authController')
const studentControllers = require('./../controllers/studentController')
const teacherControllers = require('./../controllers/teacherController')
const zoomControllers = require('./../controllers/zoomController')

const router = express.Router()
const upload = require('../upload')

router.route('/').get(authControllers.protect, studentControllers.getAllstudents)
router.route('/set-lesson/:id').put(authControllers.protect,authControllers.restrictTo(['student']), studentControllers.setLesson)
router.route('/register').post(authControllers.register)
router.route('/login').post(authControllers.login)
router.route('/cancele-lesson/:id').delete(authControllers.protect,studentControllers.CanceleLesson)
router.route('/get-student-lessons').get(authControllers.protect,authControllers.restrictTo(['student']),studentControllers.GetStudentsLessons)
router.route('/validate').get(authControllers.protect,authControllers.validUser)
router.route('/deletion').delete(authControllers.protect,studentControllers.DeleteStudent)
router.route('/forgot-password').post(authControllers.forgotPassword)
router.route('/reset-password/:token').post(authControllers.resetPassword)
router.route('/updating-user-details').put(authControllers.protect,studentControllers.Update_the_user_information)
router.route('/delete-image').delete(authControllers.protect,studentControllers.deleteImageProfile)
router.route('/update-image').post(authControllers.protect,upload.single('image'),studentControllers.updateImageProfile)
router.route('/zoom-test').post(zoomControllers.zoomTest)

// router.route('/update-image-test').post(upload.array('files',10),(req,res)=>
// {
//     res.send('Files uploaded successfully')ash 
// })

module.exports = router