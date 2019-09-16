package com.web.base;

import java.sql.Date;

/**
 * Created by wangzhenyu on 2018/4/10.
 */
public class BasePO {
    private String createUser;
    private Date createTime;
    private String updateUser;
    private Date updateTime;
    //1 有效 0 删除 默认有效
    private Integer yn;

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getYn() {
        if(yn==null){
            yn=new Integer(1);
        }
        return yn;
    }

    public void setYn(Integer yn) {
        this.yn = yn;
    }

}
