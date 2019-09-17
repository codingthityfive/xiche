package com.web.xiche.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.web.base.AbstractCommonController;
import com.web.base.ResultVO;
import com.web.xiche.po.Project;
import com.web.xiche.service.XicheService;

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
    /**
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

    @RequestMapping("/toProjectAdd")
    public String toAdd(){
        return "xiche/projectAdd";
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
		Project project = xicheService.findProjectById(id);
        model.addAttribute("project", project);
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
     * 项目查询
     * @param rows
     * @param page
     * @param project
     * @return
     */
    @RequestMapping("/queryAccountFlow")
    @ResponseBody
    public ResultVO<PageInfo<Project>> queryAccountFlow(Integer rows, Integer page, Project project){
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
     * 跳入客户流水账新增界面
     * @return
     */
    @RequestMapping("/toAccountFlowAdd")
    public String toAccountFlowAdd(){
        return "xiche/accountflowAdd";
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
