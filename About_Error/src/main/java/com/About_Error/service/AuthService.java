package com.About_Error.service;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.RefreshToken;
import com.About_Error.dto.AccessTokenDto;
import com.About_Error.dto.AddMemberRequestDto;
import com.About_Error.dto.LoginMemberRequestDto;
import com.About_Error.dto.LoginMemberResponseDto;
import com.About_Error.repository.MemberRepository;
import com.About_Error.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    public void signup(AddMemberRequestDto request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        memberService.save(request);
    }

    public LoginMemberResponseDto login(LoginMemberRequestDto request) {
        UsernamePasswordAuthenticationToken authenticationToken;
        Authentication authentication;
        try {
            authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            authentication = managerBuilder.getObject().authenticate(authenticationToken);
        } catch (BadCredentialsException e){
            return null;
        }

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

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

    public boolean validateToken(AccessTokenDto token) {
        return tokenProvider.validateToken(token.getAccessToken());
    }

    public Optional<RefreshToken> findRefreshToken(String refresh) {
        return refreshTokenRepository.findByRefresh(refresh);
    }
}
