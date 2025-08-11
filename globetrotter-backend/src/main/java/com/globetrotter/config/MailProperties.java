package com.globetrotter.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "mail")
public class MailProperties {
    private boolean smtpAuth;
    private boolean smtpStarttlsEnable;
    private String host;
    private int port;
    private String username;
    private String password;
}