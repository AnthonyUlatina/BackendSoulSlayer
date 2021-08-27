CREATE DATABASE soulslayer;
USE soulslayer;

CREATE TABLE user(
    id INT(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL
);

ALTER TABLE user
ADD PRIMARY KEY (id);

ALTER TABLE user
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE game(
    id_game INT(11) NOT NULL,
    levelGame INT(11),
    souls INT(11),
    weapon_level INT(11),
    health FLOAT,
    special_ability_bar FLOAT
);

ALTER TABLE game
ADD PRIMARY KEY (id_game);

ALTER TABLE game
MODIFY id_game INT(11) AUTO_INCREMENT;

CREATE TABLE user_has_game(
    id_user INT(11) NOT NULL,
    id_game INT(11) NOT NULL
);

ALTER TABLE user_has_game
ADD PRIMARY KEY (id_user,id_game);

ALTER TABLE `soulslayer`.`game` 
ADD COLUMN `character` VARCHAR(10);