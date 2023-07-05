package com.About_Error.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AddMemberResponseDto {

    private Long idx;
    private String email;
    private String name;
    private String phone;
}
