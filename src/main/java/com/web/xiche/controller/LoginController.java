package com.web.xiche.controller;

import com.alibaba.druid.util.StringUtils;
import com.web.base.ResultCodeEnum;
import com.web.base.ResultVO;
import com.web.xiche.po.Admin;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "login")
public class LoginController  {
    /**
     * 跳转到登录页面
     * @return
     */
    @RequestMapping()
    public String toLogin(Model model) {

//        List<InvoiceOrgInfoPo> list = invoiceOrgInfoService.findAll();
//
//        model.addAttribute("list", list);List<InvoiceOrgInfoPo> list = invoiceOrgInfoService.findAll();
//
//        model.addAttribute("list", list);

        return "login/login";
    }


    /**
     * 登录
     * @param userCode
     * @param password
     * @param session
     * @return
     */
    @RequestMapping(value = "/doLogin")
    @ResponseBody
    public ResultVO<String> login(String accountNumber, String password, String companyCode, HttpSession session) {

        if(StringUtils.isEmpty(accountNumber) || ! accountNumber.equals("admin")) {
            return ResultVO.createResult(ResultCodeEnum.ERROR.getCode(), "用户名输入有误", "用户名输入有误");
        }

        if(StringUtils.isEmpty(password) || ! password.equals("iadmin2019")) {
            return ResultVO.createResult(ResultCodeEnum.ERROR.getCode(), "密码输入有误", "密码输入有误");
        }


        Admin user = new Admin();
        //admin用户暂时默认id为0
        user.setUserName("admin");
        user.setPassword("iadmin2019");
        session.setAttribute("user", user);
        return ResultVO.createSuccess("/index");
    }

}
