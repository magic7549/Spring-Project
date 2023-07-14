package com.About_Error.controller;

import com.About_Error.dto.FindMemberEmailDto;
import com.About_Error.dto.FindMemberPasswordDto;
import com.About_Error.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/findEmail")
    public ResponseEntity findEmail(@RequestBody FindMemberEmailDto request) {
        String memberEmail = memberService.findMemberEmail(request);
        log.info(memberEmail);
        return ResponseEntity.ok(memberEmail);
    }

    @PostMapping("/findPassword")
    public ResponseEntity findPasswordProcess(@RequestBody FindMemberPasswordDto request) {
        String tempPw = memberService.updatePassword(request);
        return ResponseEntity.ok(tempPw);
    }
}
