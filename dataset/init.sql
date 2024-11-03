SELECT 'CREATE DATABASE rpg' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'rpg')\gexec
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS private;
CREATE TABLE auth.user (id VARCHAR(36) PRIMARY KEY, email VARCHAR(25) NOT NULL UNIQUE, userName VARCHAR(20) NOT NULL, password VARCHAR(80) NOT NULL);
CREATE TABLE private.character (id VARCHAR(36) PRIMARY KEY, name VARCHAR(25) NOT NULL, race VARCHAR(25), class VARCHAR(25), level INT, exp BIGINT, hpCurrent INT, hpMax INT, user_id VARCHAR(36) references auth.user(id));
