DROP TALBE user IF EXISTS;

CREATE TABLE `user` (
  `id` varchar(150) NOT NULL COMMENT '아이디',
  `password` varchar(2000) NOT NULL COMMENT '비밀번호',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8