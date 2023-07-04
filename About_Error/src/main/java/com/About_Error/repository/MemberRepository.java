package com.About_Error.repository;

import com.About_Error.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("SELECT m.email FROM Member m WHERE m.name = :name AND m.phone = :phone")
    String findEmailByNameAndPhone(@Param("name") String name, @Param("phone") String phone);
}
