package com.globetrotter.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String phone;
    private String firstname;
    private String lastname;
    private String city;
    private String country;
}
