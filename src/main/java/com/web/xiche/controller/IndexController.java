package com.web.xiche.controller;

import com.web.xiche.po.Admin;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "index")
public class IndexController {
    /**
     * 跳转到首页
     * @return
     */
    @RequestMapping()
    public String index(HttpSession session, Model model) {
        Admin user = (Admin) session.getAttribute("user");
        //如果用户没登陆跳转到登陆页面
        if (user == null) {
            return "redirect:/login";
        }
//        InvoiceOrgInfoPo orgInfo = invoiceOrgInfoService.findByOrgCode(user.getOrgCode());
//        user.setOrgName(orgInfo == null ? "" : orgInfo.getOrgName());
        model.addAttribute("sysUser", user);
        return "index";
    }
}
