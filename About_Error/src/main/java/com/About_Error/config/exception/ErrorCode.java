package com.About_Error.config.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EMAIL_DUPLICATION(409,"EMAIL-DUPLICATED","EMAIL DUPLICATED"),
    PHONE_DUPLICATION(409, "PHONE-DUPLICATED", "PHONE DUPLICATED"),
    NO_MEMBER(409, "NO-MEMBER", "NO MEMBER")
    ;

    private int status;
    private String errorCode;
    private String message;
}
