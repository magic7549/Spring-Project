package com.About_Error.service;

import com.About_Error.config.exception.SignupDuplicateException;
import com.About_Error.config.exception.ErrorCode;
import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.Member;
import com.About_Error.domain.RefreshToken;
import com.About_Error.dto.*;
import com.About_Error.repository.MemberRepository;
import com.About_Error.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    public void signup(AddMemberRequestDto request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new SignupDuplicateException("이미 가입되어 있는 유저입니다", ErrorCode.EMAIL_DUPLICATION);
        } else if (memberRepository.existsByPhone(request.getPhone())) {
            throw new SignupDuplicateException("이미 사용중인 번호입니다.", ErrorCode.PHONE_DUPLICATION);
        }
        memberService.save(request);
    }

    public LoginMemberResponseDto login(LoginMemberRequestDto request) {
        Member member = memberService.findByEmail(request.getEmail());
        if (!bCryptPasswordEncoder.matches(request.getPassword(), member.getPassword())) {
            return null;
        }

        String accessToken = tokenProvider.createAccessToken(request.getEmail());
        String refreshToken = tokenProvider.createRefreshToken(request.getEmail());

        refreshTokenRepository.save(RefreshToken.builder()
                .refresh(refreshToken)
                .email(request.getEmail())
                .build());

//       //refreshToken redis 메모리에 저장
//        refreshTokenRepository.save(RefreshToken.builder()
//                .refreshToken(refreshToken)
//                .email(request.getEmail())
//                .build());

        LoginMemberResponseDto loginResponse = LoginMemberResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .idx(memberRepository.findByEmail(request.getEmail()).get().getIdx())
                .email(request.getEmail())
                .build();

        return loginResponse;
    }

    public boolean logout(AccessTokenDto token) {
        Claims claims = tokenProvider.parseClaims(token.getAccessToken());
        refreshTokenRepository.delete(refreshTokenRepository.findByEmail(claims.getSubject()).get());
        return true;
    }

    public boolean validateToken(String token) {
        return tokenProvider.validateToken(token);
    }

    public AccessTokenDto updateAccessToken(AccessTokenDto access) {
        Claims claims = tokenProvider.parseClaims(access.getAccessToken());
        RefreshToken refreshToken = refreshTokenRepository.findByEmail(claims.getSubject()).orElseThrow(() -> new IllegalArgumentException("리프레시 토큰을 찾을 수 없습니다."));

        // 리프래시 토큰이 유효할 경우
        if (validateToken(refreshToken.getRefresh())) {
            AccessTokenDto accessToken = new AccessTokenDto();
            accessToken.setAccessToken(tokenProvider.createAccessToken(claims.getSubject()));

            return accessToken;
        }

        // 리프래시 토큰이 유효하지 않으므로 삭제
        refreshTokenRepository.delete(refreshToken);
        return null;
    }
}
