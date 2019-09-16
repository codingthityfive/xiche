package com.web.xiche.dao;

import com.web.xiche.po.AccountFlow;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountFlowMapper {
    int insert(AccountFlow record);

    int insertSelective(AccountFlow record);
}