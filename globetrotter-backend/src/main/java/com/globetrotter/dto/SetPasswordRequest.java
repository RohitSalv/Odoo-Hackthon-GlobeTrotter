package com.globetrotter.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SetPasswordRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}