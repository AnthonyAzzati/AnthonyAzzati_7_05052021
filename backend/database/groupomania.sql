-- ------------------------------------ --
-- ------------ DATABASE -------------- --
-- ------------------------------------ --
DROP DATABASE IF EXISTS `groupomania_social_media`;
CREATE DATABASE `groupomania_social_media` CHARACTER SET `utf8`;

USE `groupomania_social_media`;


-- -------------------------------- --
-- ----------- TABLES ------------- --
-- -------------------------------- --

-- ------------------------- --
-- ------ TABLE Users ------ --
-- ------------------------- --
CREATE TABLE `users`(
  `id`          smallint      NOT NULL  AUTO_INCREMENT,
  `email`       varchar(255)  DEFAULT   NULL,
  `password`    varchar(255)  DEFAULT   NULL,
  `username`    varchar(255)  DEFAULT   NULL,
  `id_role`     int           DEFAULT   NULL,
  `createdAt`   datetime      NOT NULL,
  `updatedAt`   datetime      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY  `id`        (`id`),
  UNIQUE KEY  `email`     (`email`),
  UNIQUE KEY  `username`  (`username`),
  CONSTRAINT  `fk_users_id_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;




-- ------------------------- --
-- ------ TABLE Roles ------ --
-- ------------------------- --
CREATE TABLE `roles`(
  `id`          smallint      NOT NULL  AUTO_INCREMENT,
  `name`        varchar(255)  DEFAULT   NULL,
  `createdAt`   datetime      NOT NULL,
  `updatedAt`   datetime      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY  (`id`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;



-- ------------------------- --
-- ------ TABLE Posts ------ --
-- ------------------------- --
CREATE TABLE `posts` (
 `id`         int           NOT NULL  AUTO_INCREMENT,
 `id_user`    int           DEFAULT   NULL,
 `text`       text,
 `imageUrl`   varchar(255)  DEFAULT   NULL,
 `createdAt`  datetime      NOT NULL,
 `updatedAt`  datetime      NOT NULL,
 PRIMARY KEY  (`id`),
 CONSTRAINT   `fk_posts_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;




-- ------------------------- --
-- ---- TABLE Comments ---- --
-- ------------------------- --
CREATE TABLE `comments` (
 `id`         int           NOT NULL  AUTO_INCREMENT,
 `id_post`    int           DEFAULT   NULL,
 `id_user`    int           DEFAULT   NULL,
 `text`       text,
 `imageUrl`   varchar(255)  DEFAULT   NULL,
 `createdAt`  datetime      NOT NULL,
 `updatedAt`  datetime      NOT NULL,
 PRIMARY KEY  (`id`),
 CONSTRAINT   `fk_comments_id_post` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
 CONSTRAINT   `fk_comments_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;