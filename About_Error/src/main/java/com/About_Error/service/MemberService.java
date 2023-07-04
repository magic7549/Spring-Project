package com.About_Error.service;

import com.About_Error.domain.Member;
import com.About_Error.dto.AddMemberRequest;
import com.About_Error.dto.FindMemberEmail;
import com.About_Error.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddMemberRequest dto) {
        return memberRepository.save(Member.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .phone(dto.getPhone())
                .build()).getIdx();
    }



    public String findMemberEmail(FindMemberEmail dto) {
        String email = Optional.ofNullable(memberRepository.findEmailByNameAndPhone(dto.getName(), dto.getPhone())).orElse("null");
        email = email.equals("null") ? "아이디가 존재하지 않습니다." : email;
        return email;
    }
}
