package org.lamisplus.plugins.ai;

import com.blazebit.persistence.spring.data.webmvc.impl.BlazePersistenceWebConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = BlazePersistenceWebConfiguration.class)
public class AIServicesPluginApp {

    public static void main(String[] args) {
        SpringApplication.run(AIServicesPluginApp.class, args);
    }

}



