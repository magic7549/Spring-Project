package com.About_Error.controller;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.Member;
import com.About_Error.domain.RefreshToken;
import com.About_Error.dto.*;
import com.About_Error.service.AuthService;
import com.About_Error.service.MemberService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody AddMemberRequestDto request) {
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.OK).body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginMemberRequestDto request) {
        LoginMemberResponseDto response = authService.login(request);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public void logout(@RequestBody AccessTokenDto token) {
        authService.logout(token);
    }

    @PostMapping("/signup/email")
    public boolean hasEmail(@RequestBody HasMemberEmailRequestDto request) {
        return memberService.hasMemberEmail(request);
    }

    @PostMapping("/validateToken")
    public ResponseEntity validateToken(@RequestBody AccessTokenDto token) {
        if (token.getAccessToken() == null || token.getAccessToken().isEmpty() || token.getAccessToken().isBlank() || token.getAccessToken().equals("")) {
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }

        if (authService.validateToken(token.getAccessToken())) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity updateAccessToken(@RequestBody AccessTokenDto token) {
        if (token.getAccessToken() == null || token.getAccessToken().isEmpty() || token.getAccessToken().isBlank() || token.getAccessToken().equals("")) {
            return ResponseEntity.ok().body("");
        }

        AccessTokenDto accessTokenDto = authService.updateAccessToken(token);
        if (accessTokenDto != null) {
            String accessToken = accessTokenDto.getAccessToken();
            if (accessToken != null) {
                return ResponseEntity.ok().body(accessToken);
            }
        }

        return ResponseEntity.ok().body("");
    }
}
