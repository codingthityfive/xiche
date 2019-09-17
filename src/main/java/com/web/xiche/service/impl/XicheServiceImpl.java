package com.web.xiche.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.web.xiche.dao.ProjectMapper;
import com.web.xiche.po.Project;
import com.web.xiche.service.XicheService;

@Service
public class XicheServiceImpl implements XicheService {
	@Autowired
	ProjectMapper projectMapper;
	@Override
	public PageInfo<Project> findPageInfo(PageInfo<Project> pageInfo, Project project) {
		PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
		List<Project> list = projectMapper.findPage(project);
		return new PageInfo<Project>(projectMapper.findPage(project));
	}
	@Override
	public int saveOrUpdateProject(Project project) {
		int result = 0;
        Integer id = project.getId();
        project.setCreatetime(new Date());
        if (id == null){
            result = projectMapper.insertSelective(project);
        }else {
            result = projectMapper.updateByPrimaryKeySelective(project);
        }
        return  result;
	}
	@Override
	public Project findProjectById(int id) {
		return projectMapper.selectByPrimaryKey(id);
	}
//	@Override
//	public List<Project> findProjects() {
//		Project project=new Project();
//		project.setStatus(1);
//		return projectMapper.findPage(project);
//	}
	
}
