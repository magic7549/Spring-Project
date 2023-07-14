package com.About_Error.config.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 가입 정보 중복
    @ExceptionHandler(SignupDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleSignupDuplicateException(SignupDuplicateException ex){
        log.error("handleSignupDuplicateException",ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    // 아이디 없음
    @ExceptionHandler(MemberIsNullException.class)
    public ResponseEntity<ErrorResponse> handleMemberIsNullException(MemberIsNullException ex){
        log.error("handleMemberIsNullException",ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }
}
