package com.web;

import com.web.config.UrlConfig;
import com.web.listener.EnvPreEvent;
import com.web.listener.ReadyEvent;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties(value = {UrlConfig.class})
public class WebApplication {


	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(WebApplication.class);
		app.addListeners(new EnvPreEvent());
		app.addListeners(new ReadyEvent());
		app.run(args);
	}
}
