package com.About_Error.repository;

import com.About_Error.domain.Authority;
import com.About_Error.domain.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @BeforeEach
    public void initDB() {
        memberRepository.deleteAll();
    }

    @Test
    public void findByEmailMember() {
        // given
        Member member = Member.builder()
                .email("test@test.com")
                .password("1234")
                .name("아무개")
                .phone("010-1234-5678")
                .authority(Authority.ROLE_USER)
                .build();

        // when
        memberRepository.save(member);

        // then
        Optional<Member> temp = memberRepository.findByEmail(member.getEmail());


        assertEquals(temp.get().getEmail(), member.getEmail());
        assertEquals(temp.get().getName(), member.getName());
        assertEquals(temp.get().getAuthority(), member.getAuthority());
    }
}