package com.web.xiche.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.web.xiche.po.AccountFlow;
import com.web.xiche.po.Project;

public interface XicheService {
	/**
     * 项目查询
     * @param project
     */
	PageInfo<Project> findPageInfo(PageInfo<Project> pageInfo, Project project);
	
	/**
     * 项目编辑保存
     * @param project
     */
    int saveOrUpdateProject(Project project);
    
    /**
     * 根据id获取项目单条数据
     * @param id 主键
     * @return
     */
	Project findProjectById(int id);
	
	/**
	 * 查询所有可用项目
	 */
	List<Project> findAll();
	
	/**
     * 客户流水查询
     * @param accountFlow
     */
	PageInfo<AccountFlow> findAccountFlowPageInfo(PageInfo<AccountFlow> pageInfo, AccountFlow accountFlow);
	/**
     * 客户流水编辑保存
     * @param project
     */
    int saveOrUpdateAccountFlow(AccountFlow accountFlow);
    
    /**
     * 根据id获取客户流水单条数据
     * @param id 主键
     * @return
     */
    AccountFlow findAccountFlowById(int id);
}