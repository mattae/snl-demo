package org.lamisplus.plugins.chat;

import com.blazebit.persistence.spring.data.webmvc.impl.BlazePersistenceWebConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = BlazePersistenceWebConfiguration.class)
public class ChatServicesPluginApp {

    public static void main(String[] args) {
        SpringApplication.run(ChatServicesPluginApp.class, args);
    }

}



