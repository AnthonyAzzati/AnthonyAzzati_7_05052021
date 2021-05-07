-- ------------------------------------ --
-- ------------ DATABASE -------------- --
-- ------------------------------------ --
DROP DATABASE IF EXISTS `groupomania_social_media`;
<<<<<<< Updated upstream
CREATE DATABASE `groupomania_social_media` CHARACTER SET `utf8`;

=======
CREATE DATABASE `groupomania_social_media` CHARACTER SET `utf8mb4`;
 
>>>>>>> Stashed changes
USE `groupomania_social_media`;


-- -------------------------------- --
-- ----------- TABLES ------------- --
-- -------------------------------- --

-- ------------------------- --
-- ------ TABLE Users ------ --
-- ------------------------- --
<<<<<<< Updated upstream
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
=======
CREATE TABLE `Roles`(
  `id`          TINYINT       UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
  `name`        varchar(10)             NOT NULL
>>>>>>> Stashed changes
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;




-- ------------------------- --
-- ------ TABLE Roles ------ --
-- ------------------------- --
<<<<<<< Updated upstream
CREATE TABLE `roles`(
  `id`          smallint      NOT NULL  AUTO_INCREMENT,
  `name`        varchar(255)  DEFAULT   NULL,
  `createdAt`   datetime      NOT NULL,
  `updatedAt`   datetime      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY  (`id`)
=======
CREATE TABLE `Users`(
  `id`          SMALLINT      UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
  `email`       VARCHAR(255)            NOT NULL,
  `password`    VARCHAR(255)            NOT NULL,
  `username`    VARCHAR(255)            NOT NULL,
  `id_role`     TINYINT       UNSIGNED  NOT NULL,
  `createdAt`   DATETIME                NOT NULL,
  `updatedAt`   DATETIME                NOT NULL,
  UNIQUE KEY  `email`     (`email`),
  UNIQUE KEY  `username`  (`username`),
  CONSTRAINT  `fk_users_id_role` FOREIGN KEY (`id_role`) REFERENCES `Roles` (`id`)
>>>>>>> Stashed changes
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;



-- ------------------------- --
-- ------ TABLE Posts ------ --
-- ------------------------- --
CREATE TABLE `Posts` (
 `id`         SMALLINT           UNSIGNED   PRIMARY KEY  AUTO_INCREMENT,
 `id_user`    SMALLINT           UNSIGNED   NOT NULL,
 `text`       TEXT,
 `image_url`   VARCHAR(255)            NOT NULL,
 `created_at`  DATETIME                NOT NULL,
 `updated_at`  DATETIME                NOT NULL,
 CONSTRAINT   `fk_posts_id_user` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;




-- ------------------------- --
-- ---- TABLE Comments ---- --
-- ------------------------- --
CREATE TABLE `Comments` (
 `id`         MEDIUMINT          UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
 `id_post`    SMALLINT           UNSIGNED  NOT NULL,
 `id_user`    SMALLINT           UNSIGNED  NOT NULL,
 `text`       TEXT,
 `image_url`   VARCHAR(255)           NOT NULL,
 `created_at`  DATETIME               NOT NULL,
 CONSTRAINT   `fk_comments_id_post` FOREIGN KEY (`id_post`) REFERENCES `Posts` (`id`),
 CONSTRAINT   `fk_comments_id_user` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;