package com.web.demo.controller;

import com.github.pagehelper.PageInfo;
import com.web.base.AbstractCommonController;
import com.web.base.ResultVO;
import com.web.demo.po.User;
import com.web.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Date;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
@Controller
@RequestMapping(value = "/demo/user")
public class UserController extends AbstractCommonController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserService userService;

    @RequestMapping("/toList")
    public String toList(){
        return "demo/userList";
    }
    @RequestMapping("/query")
    @ResponseBody
    public ResultVO<PageInfo<User>> query(Integer rows, Integer page, User user){
        logger.info("aa");
        if(page==null){
            page=1;
        }
        if(rows==null){
            rows=10;
        }
        PageInfo pageInfo=new PageInfo();
        pageInfo.setPageSize(rows);
        pageInfo.setPageNum(page);
        return ResultVO.createSuccess(userService.findPageInfo(pageInfo,user));
    }

    @RequestMapping("/toAdd")
    public String toAdd(){
        return "demo/userAdd";
    }

    @RequestMapping("/toUpdate")
    public String toUpdate(User user){
        return "demo/userAdd";
    }

    @RequestMapping("/save")
    public String save(User user){
        userService.insert(user);
        return "redirect:toList";
    }

}
