import io.github.mattae.snl.test.core.ConfigSchemaValidator;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Slf4j
public class PluginConfigurationTest {
    @Test
    public void testConfigFile() throws IOException {
        String config = new String(Files.readAllBytes(new ClassPathResource("plugin.yml").getFile().toPath()));
        assertTrue(ConfigSchemaValidator.isValid(config), "Configuration file is not correct");
    }
}
