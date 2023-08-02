package com.About_Error.dto.error;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddErrorPostRequestDto {

    private String title;
    private String content;
    private String accessToken;
}
