package org.lamisplus.plugins.dash;

import com.blazebit.persistence.spring.data.webmvc.impl.BlazePersistenceWebConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = BlazePersistenceWebConfiguration.class)
public class DashboardPluginApp {

    public static void main(String[] args) {
        SpringApplication.run(DashboardPluginApp.class, args);
    }

}



