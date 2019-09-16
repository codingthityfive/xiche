package com.web.xiche.dao;

import com.web.xiche.po.Project;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProjectMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Project record);

    int insertSelective(Project record);

    Project selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Project record);

    int updateByPrimaryKey(Project record);
    
    List<Project> findPage(Project record);
}