package com.web.xiche.service;

import com.github.pagehelper.PageInfo;
import com.web.xiche.po.Project;

public interface XicheService {

	PageInfo<Project> findPageInfo(PageInfo<Project> pageInfo, Project project);
	
	/**
     * 项目编辑保存
     * @param company
     */
    int saveOrUpdateProject(Project project);
    
    /**
     * 根据id获取单条数据
     * @param id 主键
     * @return
     */
	Project findProjectById(int id);
}
