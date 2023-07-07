package com.About_Error.controller;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.Member;
import com.About_Error.domain.RefreshToken;
import com.About_Error.dto.*;
import com.About_Error.service.AuthService;
import io.jsonwebtoken.Claims;
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
    private final TokenProvider tokenProvider;

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

//    @PostMapping("/refreshToken")
//    public ResponseEntity requestRefresh(@RequestBody RefreshTokenDto refreshTokenDto) {
//        RefreshToken refreshToken = authService.findRefreshToken(refreshTokenDto.getRefreshToken()).orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));
//        Claims claims = tokenProvider.parseClaims(refreshToken.getValue());
//
//        Long userId = Long.valueOf((Integer)claims.get("userId"));
//
//        Member member = memberService.getMember(userId).orElseThrow(() -> new IllegalArgumentException("Member not found"));
//
//
//        List roles = (List) claims.get("roles");
//        String email = claims.getSubject();
//
//        String accessToken = jwtTokenizer.createAccessToken(userId, email, roles);
//
//        MemberLoginResponseDto loginResponse = MemberLoginResponseDto.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshTokenDto.getRefreshToken())
//                .memberId(member.getMemberId())
//                .nickname(member.getName())
//                .build();
//        return new ResponseEntity(loginResponse, HttpStatus.OK);
//    }
}
