package com.web.demo.po;

import com.web.base.BasePO;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
public class User extends BasePO {
    private Integer id;
    private String name;
    private int status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
