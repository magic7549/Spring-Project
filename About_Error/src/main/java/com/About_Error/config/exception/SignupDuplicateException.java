package com.About_Error.config.exception;

import lombok.Getter;

@Getter
public class SignupDuplicateException extends RuntimeException{

    private ErrorCode errorCode;

    public SignupDuplicateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
