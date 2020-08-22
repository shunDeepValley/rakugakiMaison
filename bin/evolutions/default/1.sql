# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table m_auth (
  auth_id                       serial not null,
  password_hash                 bytea not null,
  constraint pk_m_auth primary key (auth_id)
);

create table t_category (
  category_id                   serial not null,
  category_name                 varchar(255) not null,
  constraint pk_t_category primary key (category_id)
);

create table t_main_img (
  main_id                       integer not null,
  main_branch_id                integer not null,
  main_img                      bytea,
  comment                       varchar(255),
  font_color                    varchar(255),
  font_size                     varchar(255)
);

create table t_story (
  story_id                      serial not null,
  story_upd_date                timestamptz not null,
  story_cnt                     integer not null,
  story_name                    varchar(255) not null,
  main_id                       integer not null,
  thumbnail_id                  integer not null,
  category_id                   integer not null,
  title_id                      integer not null,
  watch_cnt                     integer not null,
  constraint pk_t_story primary key (story_id)
);

create table t_thumbnail_img (
  thumbnail_id                  serial not null,
  thumbnail_img                 bytea not null,
  constraint pk_t_thumbnail_img primary key (thumbnail_id)
);

create table t_title (
  title_id                      serial not null,
  title_name                    varchar(255) not null,
  constraint pk_t_title primary key (title_id)
);


# --- !Downs

drop table if exists m_auth cascade;

drop table if exists t_category cascade;

drop table if exists t_main_img cascade;

drop table if exists t_story cascade;

drop table if exists t_thumbnail_img cascade;

drop table if exists t_title cascade;

