package com.web.demo.service;

import com.github.pagehelper.PageInfo;
import com.web.demo.po.User;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
public interface UserService {
    PageInfo<User> findPageInfo(PageInfo pageInfo, User user);
    int insert(User user);
    User findById(Integer id);
}
