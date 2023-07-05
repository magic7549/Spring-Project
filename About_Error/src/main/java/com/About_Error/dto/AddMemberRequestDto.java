package com.About_Error.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Getter
@Setter
public class AddMemberRequestDto {

    private String email;
    private String password;
    private String name;
    private String phone;
}
