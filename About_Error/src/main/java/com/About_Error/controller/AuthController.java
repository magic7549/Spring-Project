package com.About_Error.controller;

import com.About_Error.dto.AddMemberRequestDto;
import com.About_Error.dto.LoginMemberRequestDto;
import com.About_Error.dto.LoginMemberResponseDto;
import com.About_Error.dto.AddMemberResponseDto;
import com.About_Error.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AddMemberResponseDto> signup(@RequestBody AddMemberRequestDto request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginMemberRequestDto request) {
        LoginMemberResponseDto response = authService.login(request);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return ResponseEntity.ok(response);
    }
}
