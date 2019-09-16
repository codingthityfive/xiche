package com.web.filter;

import java.io.IOException;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.web.xiche.po.Admin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.util.StringUtils;

@WebFilter(filterName = "sessionFilter",urlPatterns = {"/*"})
@Order(value = 1)
public class SessionFilter implements Filter{
	private static final Logger logger = LoggerFactory.getLogger(SessionFilter.class);

	private static final String IS_TEST = "1";
	
	@Override
	public void destroy() {
		
	}

	@SuppressWarnings("unlikely-arg-type")
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Headers", "accept,content-type"); 
//        response.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,DELETE,PUT"); 
		Admin user=(Admin) request.getSession().getAttribute("sysUser");

        /**
         * 前端VUE本地调试session问题
         * isTest是1的时候，认为是调试状态
         */
//        String isTest = request.getHeader("isTest");//测试1 其他是非测试
//        if(!StringUtils.isEmpty(isTest) && IS_TEST.equals(isTest)) {
//        	String userId = request.getHeader("userId");
//        	if (user==null){
//        		if (!StringUtils.isEmpty(userId)) {
//        			user = loginService.getXyySpSysUserById(Integer.parseInt(userId));
//        			logger.error("--------------------"+user.getId());
//        			request.getSession().setAttribute("sysUser",user);
//        		}
//        	}else if (!user.getId().equals(userId)){//当前用户不等于传参Id
//        		if (!StringUtils.isEmpty(userId)) {
//        			user = loginService.getXyySpSysUserById(Integer.parseInt(userId));
//        			logger.error("--------------------"+user.getId());
//        			request.getSession().setAttribute("sysUser",user);
//        		}
//        	}
//        }

        String uri = request.getRequestURI();
        if (uri.equals(request.getContextPath()+"/login/" )){
        	response.sendRedirect(request.getContextPath()+"/login");
        }
        
        boolean isContains = urlContainsContent(uri);
		if (user == null && isContains) {
			//重定向到登录
			logger.info("用户未登录，跳转到登录页面");
        	response.sendRedirect(request.getContextPath()+"/login");
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}
	
	/**
	 * 
	 * @param content
	 * @return
	 */
	private boolean urlContainsContent(String uri) {
		boolean result = false;
		if(!uri.contains("/login") && 
				!uri.contains("/static") && 
				!uri.contains("/images")&& 
				!uri.contains("/changjia")&& 
				!uri.contains("/externalInterface")&& 
				!uri.contains("/proDetailShowMap")&&
				!uri.contains("/whetherProtocol")&& 
				!uri.contains("/pageList")&& 
				!uri.contains("/shuabiao")&& 
				!uri.contains("/supplySales")&& 
				!uri.contains("/appBootUp")&&
				!uri.contains("/appPicturePath")&&
				!uri.contains("/add")&&
				!uri.contains("/erpButtJoint")&&
				!uri.contains("/compProRebate")&&
				!uri.contains("/queryProRebate")&&
				!uri.contains("/compProRebateOther")&&
				!uri.contains("/productSwap")
				){
			result = true;
		}
		return result;
	}
}
