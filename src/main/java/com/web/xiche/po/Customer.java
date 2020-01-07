package com.web.xiche.po;

import java.util.Date;

public class Customer {
    private Integer id;

    private String remark;

    private String accountnum;

    private String password;

    private String mobile;

    private Integer state;

    private String username;

    private Date createtime;

    private Date updatetime;

    private Integer points;

    private Integer balance;

    private Integer card;

    public Integer getCard() {
        return card;
    }

    public void setCard(Integer card) {
        if (card==null){
            this.card = 0;
        }else{
            this.card = card;
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getAccountnum() {
        return accountnum;
    }

    public void setAccountnum(String accountnum) {
        this.accountnum = accountnum == null ? null : accountnum.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        if (points==null){
            this.points=0;
        }else{
            this.points = points;
        }
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        if (balance == null) {
            this.balance=0;
        }else{
            this.balance = balance;
        }
    }
}