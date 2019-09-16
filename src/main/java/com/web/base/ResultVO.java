package com.web.base;

/**
 * Created by wangzhenyu on 2018/4/2.
 * 统一的返回结果
 */
public class ResultVO<T>{
    //0成功
    private int code;
    private String msg;
    private T result;
    public ResultVO(T result){
        this(ResultCodeEnum.SUCCESS,result);
    }

    public ResultVO(ResultCodeEnum resultCodeEnum, T result){
        this.result=result;
        this.code=resultCodeEnum.getCode();
        this.msg=resultCodeEnum.getMsg();
    }

    public static<T> ResultVO<T> createSuccess(T result){
        return new ResultVO(result);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }
}
