package com.web.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * @author lxx
 * @date 2018年4月19日
 * @version 1.0
 */
@Configuration
public class JsonMapper {

	@Bean
	public ObjectMapper getObjectMapper() {
		ObjectMapper mapper = new ObjectMapper();
//		mapper.setSerializationInclusion(Include.NON_NULL); // 不序列化null的属性
		// 空值处理为空串
		mapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>() {
			@Override
			public void serialize(Object value, JsonGenerator jgen, SerializerProvider provider)
					throws IOException, JsonProcessingException {
				jgen.writeString("");
			}
		});
		mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")); // 默认的时间序列化格式
		// 设置时区
		mapper.setTimeZone(TimeZone.getDefault());// getTimeZone("GMT+8:00")
		return mapper;
	}
}
