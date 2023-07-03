package com.About_Error.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMemberRequest {

    private String email;
    private String password;
    private String member_name;
    private String phone;
}
