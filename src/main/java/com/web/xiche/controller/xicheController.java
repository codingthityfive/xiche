package com.web.xiche.controller;

import com.github.pagehelper.PageInfo;
import com.web.base.AbstractCommonController;
import com.web.base.ResultVO;
import com.web.xiche.po.AccountFlow;
import com.web.xiche.po.Customer;
import com.web.xiche.po.Project;
import com.web.xiche.service.XicheService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
@Controller
@RequestMapping(value = "/xiche")
public class xicheController extends AbstractCommonController {
    private static final Logger logger = LoggerFactory.getLogger(xicheController.class);
    @Autowired
    XicheService xicheService;
    /**
     * 跳入项目界面
     * @return
     */
    @RequestMapping("/toProjectList")
    public String toList(){
        return "xiche/projectList";
    }
    /**o
     * 项目查询
     * @param rows
     * @param page
     * @param project
     * @return
     */
    @RequestMapping("/queryProject")
    @ResponseBody
    public ResultVO<PageInfo<Project>> query(Integer rows, Integer page, Project project){
        logger.info("aa");
        if(page==null){
            page=1;
        }
        if(rows==null){
            rows=10;
        }
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageSize(rows);
        pageInfo.setPageNum(page);
        return ResultVO.createSuccess(xicheService.findPageInfo(pageInfo,project));
    }

    /**
	 * 项目编辑保存
	 * @return
	 */
	@RequestMapping(value = "/saveOrUpdateProject")
	@ResponseBody
	public ResultVO<Project> saveOrUpdate(Project project) {
		logger.info("11");
		Integer id = project.getId();
		try {
			if(id == null){
				xicheService.saveOrUpdateProject(project);
			}else {
				xicheService.saveOrUpdateProject(project);
			}
		} catch (IllegalArgumentException e) {
			return ResultVO.createResult(2, e.getMessage(), project);
		} catch (Exception e) {
			return ResultVO.createResult(3, e.getMessage(), project);
		}
		return ResultVO.createSuccess(project);
	}

	/**
	 * 项目跳转到编辑页面
	 *
	 * @return
	 */
	@RequestMapping(value = "/toUpdateProject")
	public String toUpdate(HttpServletRequest request, Model model, Integer id) {
	    if(id!=null){
            Project project = xicheService.findProjectById(id);
            model.addAttribute("project", project);
        }else{
            model.addAttribute("project", new Project());
        }
		return "xiche/projectAdd";
	}


	/**
     * 跳入客户流水账界面
     * @return
     */
    @RequestMapping("/toAccountFlowList")
    public String toAccountFlowList(){
        return "xiche/accountflowList";
    }
    /**
     * 查询单条项目数据
     */
    @RequestMapping("/getOneProjectById")
    @ResponseBody
    public ResultVO<Project> getOneProjectById(Integer id){
    	Project project = xicheService.findProjectById(id);
    	return ResultVO.createSuccess(project);
    }
    /**
     * 客户流水账查询
     * @param rows
     * @param page
     * @param project
     * @return
     */
    @RequestMapping("/queryAccountFlow")
    @ResponseBody
    public ResultVO<PageInfo<AccountFlow>> queryAccountFlow(Integer rows, Integer page, AccountFlow accountFlow){
        logger.info("aa");
        if(page==null){
            page=1;
        }
        if(rows==null){
            rows=10;
        }
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageSize(rows);
        pageInfo.setPageNum(page);
        return ResultVO.createSuccess(xicheService.findAccountFlowPageInfo(pageInfo,accountFlow));
    }
    /**
     * 跳入客户流水账新增界面
     * @return
     */
    @RequestMapping("/toAccountFlowAdd")
    public String toAccountFlowAdd(Model model){
    	List<Project> projectList = xicheService.findAll();
    	model.addAttribute("projectList", projectList);
        return "xiche/accountflowAdd";
    }
    
    /**
	 * 客户流水编辑保存
	 * @return
	 */
	@RequestMapping(value = "/saveOrUpdateAccountFlow")
	@ResponseBody
	public ResultVO<AccountFlow> saveOrUpdateAccountFlow(AccountFlow accountFlow) {
		logger.info("11");
		Integer id = accountFlow.getId();
		try {
			if(id == null){
				xicheService.saveOrUpdateAccountFlow(accountFlow);
			}else {
				xicheService.saveOrUpdateAccountFlow(accountFlow);
			}
		} catch (IllegalArgumentException e) {
			return ResultVO.createResult(2, e.getMessage(), accountFlow);
		} catch (Exception e) {
			return ResultVO.createResult(3, e.getMessage(), accountFlow);
		}
		return ResultVO.createSuccess(accountFlow);
	}
	
	/**
	 * 项目跳转到编辑页面
	 *
	 * @return
	 */
	@RequestMapping(value = "/toUpdateAccountFlow")
	public String toUpdateAccountFlow(HttpServletRequest request, Model model, Integer id) {
		AccountFlow accountFlow = xicheService.findAccountFlowById(id);
        model.addAttribute("accountFlow", accountFlow);
        List<Project> projectList = xicheService.findAll();
    	model.addAttribute("projectList", projectList);
		return "xiche/accountflowAdd";
	}

    /**
     * 跳入客户流水账界面
     * @return
     */
    @RequestMapping("/toCustomerList")
    public String toCustomerList(){
        return "xiche/customerList";
    }
    @RequestMapping("/queryCustomer")
    @ResponseBody
    public ResultVO<PageInfo<AccountFlow>> queryCustomer(Integer rows, Integer page, Customer customer){
        logger.info("aa");
        if(page==null){
            page=1;
        }
        if(rows==null){
            rows=10;
        }
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageSize(rows);
        pageInfo.setPageNum(page);
        return ResultVO.createSuccess(xicheService.findPageCus(pageInfo,customer));
    }

    /**
     * 跳入客户流水账新增界面
     * @return
     */
    @RequestMapping("/toCustomerAdd")
    public String toCustomerAdd(Model model){
//        List<Project> projectList = xicheService.findAll();
//        model.addAttribute("projectList", projectList);
        Customer customer = new Customer();
        model.addAttribute("cus", customer);
        return "xiche/customerAdd";
    }
    @RequestMapping("/toUpdateCustomer")
    public String toCustomerUpdate(Integer id,Model model){
//        List<Project> projectList = xicheService.findAll();
//        model.addAttribute("projectList", projectList);

        Customer customer = xicheService.findCustomerById(id);
        model.addAttribute("cus", customer);
        return "xiche/customerAdd";
    }


    /**
     * 客户流水编辑保存
     * @return
     */
    @RequestMapping(value = "/saveOrUpdateCustomer")
    @ResponseBody
    public ResultVO<Customer> saveOrUpdateCustomer(Customer customer) {
        logger.info("11");
        try {
            customer.setAccountnum(customer.getMobile());
            xicheService.saveOrUpdateCustomer(customer);
        } catch (IllegalArgumentException e) {
            return ResultVO.createResult(2, e.getMessage(), customer);
        } catch (Exception e) {
            return ResultVO.createResult(3, e.getMessage(), customer);
        }
        return ResultVO.createSuccess(customer);
    }

//
//    @RequestMapping("/toUpdate")
//    public String toUpdate(User user){
//        return "demo/userAdd";
//    }
//
//    @RequestMapping("/save")
//    public String save(User user){
//        userService.insert(user);
//        return "redirect:toList";
//    }

}
