INSERT INTO `roles` (`id`,`roletype`,`subroletype`,`roleurn`,`displayname`,`displayorder`,`sets_permissions`,`take_attendance`,`record_attendance`,`edit_gradesettings`)
VALUES
  (1,'Instructor','','urn:lti:role:ims/lis/Instructor','Instructor',0,1,1,0,1);
  (2,'Learner/Instructor','','urn:lti:role:ims/lis/Learner/Instructor','Project Maintainer',1,1,1,1,1),
  (3,'TeachingAssistant','','urn:lti:role:ims/lis/TeachingAssistant','Teaching Assistant',2,0,1,0,1),
  (4,'TeachingAssistant/Grader','','urn:lti:role:ims/lis/TeachingAssistant/Grader','Grader',3,0,0,0,0),
  (5,'Member','','urn:lti:role:ims/lis/Member','Project Participant',4,0,0,1,0),
  (6,'Learner','','urn:lti:role:ims/lis/Learner','Student',5,0,0,1,0),
  (7,'Instructor/GuestInstructor','','urn:lti:role:ims/lis/Instructor/GuestInstructor','Site Assistant',6,0,0,0,0),
  (8,'Instructor/ExternalInstructor','','urn:lti:role:ims/lis/Instructor/ExternalInstructor','Site Collaborator',7,0,0,0,0),
  (9,'Learner/GuestLearner','','urn:lti:role:ims/lis/Learner/GuestLearner','Guest',8,0,0,0,0);

INSERT INTO `attendancetypes`
(`id`,`name`,`description`,`display_column`,`color`,`absent`,`default_type`,`display_order`,`default_inactive`,`default_created`,`grade_type`)
VALUES
  (1,'Present','Student attended class normally.',0,'#0d6325',0,1,0,0,0,0),
  (2,'Absent','Student did not attend class.',1,'#c60f13',1,0,1,1,0,2),
  (3,'Late','Student was late to class.',1,'#daa520',0,0,2,0,0,1),
  (4,'Excused','Student was excused for illness or other reason.',1,'#424141',1,0,4,0,1,0),
  (5,'Left Early','Student left class early.',1,'#daa520',0,0,3,0,0,1);
