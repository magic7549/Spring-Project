package com.About_Error.service;

import com.About_Error.config.exception.ErrorCode;
import com.About_Error.config.exception.MemberIsNullException;
import com.About_Error.domain.Authority;
import com.About_Error.domain.Member;
import com.About_Error.dto.AddMemberRequestDto;
import com.About_Error.dto.FindMemberEmailDto;
import com.About_Error.dto.FindMemberPasswordDto;
import com.About_Error.dto.HasMemberEmailRequestDto;
import com.About_Error.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void save(AddMemberRequestDto dto) {
        memberRepository.save(Member.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .phone(dto.getPhone())
                .authority(Authority.ROLE_USER)
                .build());
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 email 입니다."));
    }

    public boolean hasMemberEmail(HasMemberEmailRequestDto dto) {
        return memberRepository.existsByEmail(dto.getEmail());
    }

    public String findMemberEmail(FindMemberEmailDto dto) {
        String email = Optional.ofNullable(memberRepository.findEmailByNameAndPhone(dto.getName(), dto.getPhone())).orElse("null");
        email = email.equals("null") ? null : email;
        return email;
    }

    @Transactional
    public String updatePassword(FindMemberPasswordDto dto) {
        Optional<Member> member = memberRepository.findByEmail(dto.getEmail());

        // 회원정보가 없을 경우 null
        if (member.isEmpty() || !member.get().getPhone().equals(dto.getPhone())) {
            throw new MemberIsNullException("회원정보가 없습니다.", ErrorCode.NO_MEMBER);
        }

        // 랜덤 임시 비밀번호 발급
        String tempPw = RandomStringUtils.random(8, true, true);
        member.get().updatePassword(bCryptPasswordEncoder.encode(tempPw));

        return tempPw;
    }
}
