package com.About_Error.config.exception;

import lombok.Getter;

@Getter
public class MemberIsNullException extends RuntimeException{

    private ErrorCode errorCode;

    public MemberIsNullException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
