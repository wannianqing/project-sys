CREATE DATABASE IF NOT EXISTS eye_project DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

## 插入角色

INSERT INTO `roles` VALUES (1, '2023-12-23 20:27:14.936996', '2023-12-23 20:27:14.936996', 'admin', '超级管理员');
INSERT INTO `roles` VALUES (2, '2023-12-23 20:27:14.936996', '2023-12-23 20:27:14.936996', 'teacher', '教师');
INSERT INTO `roles` VALUES (3, '2023-12-23 20:27:14.936996', '2023-12-23 20:27:14.936996', 'student', '学生');


## 插入企业

INSERT INTO `firm` VALUES (1, '2023-12-23 20:27:14.936996', '2023-12-23 20:27:14.936996', '鼎誉科技', '广西柳州市高新四路荣和天誉三期 7 栋门面 102 号');

## 插入用户

INSERT INTO `users` VALUES (1, '2023-12-24 12:20:33.340226', '2023-12-24 12:20:33.340226', 2 , 'admin', 'x9yFqkQKcyZTDIL9bupEzA==', 50, 1, '13133388886', '', '广西柳州市', '', 2, '', 1, 1, 1);

INSERT INTO `users` VALUES (2, '2023-12-24 12:20:33.340226', '2023-12-24 12:20:33.340226', 1, '测试 1', 'x9yFqkQKcyZTDIL9bupEzA==', 24, 1, '13133388886', '', '广西柳州市', '', 2, '', 1, 1, 1);

INSERT INTO `users` VALUES (3, '2023-12-24 12:20:33.340226', '2023-12-24 12:20:33.340226', 1, '测试 2', 'x9yFqkQKcyZTDIL9bupEzA==', 24, 1, '13133388886', '', '广西柳州市', '', 2, '', 1, 1, 1);

## 插入菜单

INSERT INTO `menus` VALUES (1, '2023-12-21 22:44:58.088074', '2023-12-21 22:44:58.088074', '权限管理', 0, 'Permission', 'iconfont icon-permission', '/permission', 1);
INSERT INTO `menus` VALUES (2, '2023-12-23 20:28:10.177884', '2023-12-23 20:28:10.177884', '用户管理', 1, 'User', '', '/permission/user', 0);
INSERT INTO `menus` VALUES (3, '2023-12-23 20:28:31.504608', '2023-12-23 20:28:31.504608', '角色管理', 1, 'Role', '', '/permission/role', 0);
INSERT INTO `menus` VALUES (4, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '菜单管理', 1, 'Menu', '', '/permission/menu', 0);
INSERT INTO `menus` VALUES (5, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '训练管理', 0, 'Train', 'iconfont icon-lianxi', '/train', 1);
INSERT INTO `menus` VALUES (6, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '课堂训练', 5, 'ClassRoom', '', '/train/classroom', 0);
INSERT INTO `menus` VALUES (7, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '课后训练', 5, 'Afterclass', '', '/train/afterclass', 0);
INSERT INTO `menus` VALUES (8, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '品格教育', 5, 'Character', '', '/train/character', 0);
INSERT INTO `menus` VALUES (9, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '数据管理', 0, 'Analyze', 'iconfont icon-fenxi', '/analyze', 1);
INSERT INTO `menus` VALUES (10, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '数据分析', 9, 'Data', '', '/analyze/data', 0);
INSERT INTO `menus` VALUES (11, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '训练追踪', 9, 'Track', '', '/analyze/track', 0);
INSERT INTO `menus` VALUES (12, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '企业管理', 0, 'Software', 'iconfont icon-ruanjian', '/software', 1);
INSERT INTO `menus` VALUES (13, '2023-12-23 20:28:56.321550', '2023-12-23 20:28:56.321550', '企业管理', 12, 'Firm', '', '/software/firm', 0);

## 插入角色菜单

INSERT INTO `role_menu` VALUES (1, '2023-12-23 20:30:01.859397', '2023-12-23 20:30:01.859397', 1, 1);
INSERT INTO `role_menu` VALUES (2, '2023-12-24 11:30:28.939653', '2023-12-24 11:30:28.939653', 1, 2);
INSERT INTO `role_menu` VALUES (3, '2023-12-24 12:22:17.019415', '2023-12-24 12:22:17.019415', 1, 3);
INSERT INTO `role_menu` VALUES (4, '2023-12-24 16:13:46.428233', '2023-12-24 16:13:46.428233', 1, 4);
INSERT INTO `role_menu` VALUES (5, '2023-12-24 16:13:46.428233', '2023-12-24 16:13:46.428233', 1, 5);
INSERT INTO `role_menu` VALUES (6, '2023-12-24 16:13:46.428233', '2023-12-24 16:13:46.428233', 1, 6);
INSERT INTO `role_menu` VALUES (7, '2023-12-24 16:13:46.428233', '2023-12-24 16:13:46.428233', 1, 7);
INSERT INTO `role_menu` VALUES (8, '2023-12-24 16:13:46.428233', '2023-12-24 16:13:46.428233', 1, 8);

root/abc12345
