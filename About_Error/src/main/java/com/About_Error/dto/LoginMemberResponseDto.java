package com.About_Error.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class LoginMemberResponseDto {

    private String accessToken;
    private String refreshToken;

    private Long idx;
    private String email;
}
