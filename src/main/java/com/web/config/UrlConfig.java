package com.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
@ConfigurationProperties(prefix = "url")
public class UrlConfig {
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
