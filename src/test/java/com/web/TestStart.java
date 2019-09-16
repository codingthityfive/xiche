package com.web;

import com.web.config.UrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by wangzhenyu on 2018/4/2.
 */
@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties(value = {UrlConfig.class})
public class TestStart {
    public static void main(String[] args) {
        SpringApplication.run(TestStart.class, args);
    }
}
