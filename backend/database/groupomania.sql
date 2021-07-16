-- ------------------------------------ --
-- ------------ DATABASE -------------- --
-- ------------------------------------ --
CREATE DATABASE `groupomania_social_media` CHARACTER SET `utf8`;

USE `groupomania_social_media`;


-- -------------------------------- --
-- ----------- TABLES ------------- --
-- -------------------------------- --

-- ------------------------- --
-- ------ TABLE Users ------ --
-- ------------------------- --
CREATE TABLE `Roles`(
  `id`          TINYINT       UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
  `name`        varchar(10)             NOT NULL
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;

INSERT INTO `Roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'moderator'),
(3, 'user');


-- ------------------------- --
-- ------ TABLE Roles ------ --
-- ------------------------- --
CREATE TABLE `Users`(
  `id`          SMALLINT      UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
  `email`       VARCHAR(255)            NOT NULL,
  `password`    VARCHAR(255)            NOT NULL,
  `username`    VARCHAR(60)             NOT NULL,
  `role_id`     TINYINT       UNSIGNED  NOT NULL,
  `created_at`   DATETIME                NOT NULL,
  `updated_at`   DATETIME                NOT NULL,
  UNIQUE KEY  `email`     (`email`),
  UNIQUE KEY  `username`  (`username`),
  CONSTRAINT  `fk_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;



-- ------------------------- --
-- ------ TABLE Posts ------ --
-- ------------------------- --
CREATE TABLE `Posts` (
 `id`           SMALLINT       UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
 `id_user`      SMALLINT       UNSIGNED  NOT NULL,
 `post_username`VARCHAR(60)              NOT NULL, 
 `title`        TINYTEXT                 NOT NULL,
 `text`         TEXT,
 `image_url`    VARCHAR(255),
 `created_at`   DATETIME                 NOT NULL,
 `updated_at`   DATETIME                 NOT NULL,
 CONSTRAINT   `fk_posts_id_user`  FOREIGN KEY (`id_user`)   REFERENCES `Users` (`id`)
 CONSTRAINT   `fk_posts_username` FOREIGN KEY (`username`)  REFERENCES `Users` (`username`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;



-- ------------------------- --
-- ---- TABLE Comments ---- --
-- ------------------------- --
CREATE TABLE `Comments` (
 `id`          MEDIUMINT       UNSIGNED  PRIMARY KEY  AUTO_INCREMENT,
 `id_post`     SMALLINT        UNSIGNED  NOT NULL,
 `id_user`     SMALLINT        UNSIGNED  NOT NULL,
 `comment_username` VARCHAR(60)          NOT NULL,
 `text`        TEXT,
 `image_url`   VARCHAR(255),
 `created_at`  DATETIME                  NOT NULL,
 CONSTRAINT   `fk_comments_id_post` FOREIGN KEY (`id_post`) REFERENCES `Posts` (`id`),
 CONSTRAINT   `fk_comments_id_user` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`)
)
  ENGINE=INNODB
  DEFAULT CHARSET=utf8mb4;