package com.About_Error.service;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.Authority;
import com.About_Error.domain.Member;
import com.About_Error.dto.AddMemberRequestDto;
import com.About_Error.dto.LoginMemberRequestDto;
import com.About_Error.dto.LoginMemberResponseDto;
import com.About_Error.dto.AddMemberResponseDto;
import com.About_Error.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenProvider tokenProvider;

    public AddMemberResponseDto signup(AddMemberRequestDto request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Member member = memberRepository.save(Member.builder()
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .phone(request.getPhone())
                .authority(Authority.ROLE_USER)
                .build());

        return AddMemberResponseDto.builder()
                .idx(member.getIdx())
                .email(member.getEmail())
                .name(member.getName())
                .phone(member.getPhone())
                .build();
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

        // refreshToken redis 메모리에 저장하는 코드 짜기
        //
        //

        LoginMemberResponseDto loginResponse = LoginMemberResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .idx(memberRepository.findByEmail(request.getEmail()).get().getIdx())
                .email(request.getEmail())
                .build();

        return loginResponse;
    }
}
