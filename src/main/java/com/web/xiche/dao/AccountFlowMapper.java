package com.web.xiche.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.web.xiche.po.AccountFlow;

@Mapper
public interface AccountFlowMapper {
    int insert(AccountFlow record);

    int insertSelective(AccountFlow record);
    
    int updateByPrimaryKeySelective(AccountFlow record);
    
    List<AccountFlow> findPage(AccountFlow record);
    
    AccountFlow selectByPrimaryKey(Integer id);
}