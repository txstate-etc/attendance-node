DROP TABLE IF EXISTS `attendancetypes`;
CREATE TABLE `attendancetypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `display_column` tinyint(4) NOT NULL DEFAULT '0',
  `color` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `absent` tinyint(1) NOT NULL DEFAULT '0',
  `default_type` tinyint(1) NOT NULL DEFAULT '0',
  `display_order` tinyint(4) NOT NULL DEFAULT '0',
  `default_inactive` tinyint(1) NOT NULL DEFAULT '0',
  `default_created` tinyint(1) NOT NULL DEFAULT '0',
  `grade_type` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_attendancetypes_on_absent` (`absent`),
  KEY `index_attendancetypes_on_default_created` (`default_created`),
  KEY `index_attendancetypes_on_default_inactive` (`default_inactive`),
  KEY `index_attendancetypes_on_default_type` (`default_type`),
  KEY `index_attendancetypes_on_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `checkins`;
CREATE TABLE `checkins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userattendance_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `source` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_checkins_on_userattendance_id` (`userattendance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `checkinsettings`;
CREATE TABLE `checkinsettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) DEFAULT NULL,
  `auto_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `tardy_after` int(11) NOT NULL DEFAULT '15',
  `absent_after` int(11) NOT NULL DEFAULT '30',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_checkinsettings_on_site_id` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `gradesettings`;
CREATE TABLE `gradesettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) DEFAULT NULL,
  `tardy_value` decimal(3,2) NOT NULL DEFAULT '1.00',
  `forgiven_absences` int(11) NOT NULL DEFAULT '0',
  `deduction` decimal(3,2) NOT NULL DEFAULT '0.00',
  `tardy_per_absence` int(11) NOT NULL DEFAULT '0',
  `max_points` int(11) NOT NULL DEFAULT '100',
  `auto_max_points` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_gradesettings_on_site_id` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `gradeupdates`;
CREATE TABLE `gradeupdates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `membership_id` int(11) NOT NULL,
  `tries` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `last_error` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_gradeupdates_on_membership_id` (`membership_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `meetings`;
CREATE TABLE `meetings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `starttime` datetime NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL,
  `section_id` int(11) NOT NULL,
  `future_meeting` tinyint(1) NOT NULL DEFAULT '0',
  `checkin_code` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `source_starttime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_meetings_on_site_id_and_deleted_and_cancelled` (`deleted`,`cancelled`),
  KEY `index_meetings_on_section_id` (`section_id`),
  KEY `index_meetings_on_updated_at` (`updated_at`),
  KEY `index_meetings_on_starttime` (`starttime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `memberships`;
CREATE TABLE `memberships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `sourcedid` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_sites_users_on_dropped` (`active`),
  KEY `index_sites_users_on_site_id` (`site_id`),
  KEY `index_sites_users_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `memberships_sections`;
CREATE TABLE `memberships_sections` (
  `section_id` int(11) NOT NULL,
  `membership_id` int(11) NOT NULL,
  KEY `index_memberships_sections_on_membership_id` (`membership_id`),
  KEY `index_memberships_sections_on_section_id` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `memberships_siteroles`;
CREATE TABLE `memberships_siteroles` (
  `siterole_id` int(11) NOT NULL DEFAULT '0',
  `membership_id` int(11) NOT NULL DEFAULT '0',
  KEY `index_roles_users_on_user_id` (`membership_id`),
  KEY `index_roles_users_on_role_id` (`siterole_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roletype` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `subroletype` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `roleurn` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `displayname` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `displayorder` tinyint(4) NOT NULL DEFAULT '0',
  `sets_permissions` tinyint(1) NOT NULL DEFAULT '0',
  `take_attendance` tinyint(1) NOT NULL DEFAULT '0',
  `record_attendance` tinyint(1) NOT NULL DEFAULT '0',
  `edit_gradesettings` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `sections`;
CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `users_hash` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `lms_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_sections_on_site_id` (`site_id`),
  KEY `index_sections_on_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `siteroles`;
CREATE TABLE `siteroles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0',
  `role_id` int(11) NOT NULL DEFAULT '0',
  `take_attendance` tinyint(1) NOT NULL DEFAULT '0',
  `record_attendance` tinyint(1) NOT NULL DEFAULT '0',
  `edit_gradesettings` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_roles_sites_on_role_id` (`role_id`),
  KEY `index_roles_sites_on_site_id` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `sites`;
CREATE TABLE `sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `context_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `context_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `context_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `roster_fetched_at` datetime DEFAULT NULL,
  `roster_hash` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `update_in_progress` datetime DEFAULT NULL,
  `outcomes_url` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `points_url` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `lms_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `is_canvas` tinyint(1) NOT NULL DEFAULT '0',
  `assignment_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_sites_on_context_id` (`context_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `userattendances`;
CREATE TABLE `userattendances` (
  `meeting_id` int(11) NOT NULL DEFAULT '0',
  `membership_id` int(11) NOT NULL,
  `attendancetype_id` int(11) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `override` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_userattendances_on_meeting_id_and_membership_id` (`meeting_id`,`membership_id`),
  KEY `index_meetings_users_on_attendancetype_id` (`attendancetype_id`),
  KEY `index_meetings_users_on_meeting_id` (`meeting_id`),
  KEY `index_userattendances_on_membership_id` (`membership_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `netid` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `tc_user_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `lms_user_id` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_users_on_lastname` (`lastname`),
  KEY `index_users_on_netid` (`netid`),
  KEY `index_users_on_tc_user_id` (`tc_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
