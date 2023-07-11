package com.About_Error.controller;

import com.About_Error.dto.FindMemberEmailDto;
import com.About_Error.dto.FindMemberPassword;
import com.About_Error.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

//    @GetMapping("/findPassword")
//    public String findPassword() {
//        return "/findPassword";
//    }
//
//    @PostMapping("/findPassword")
//    public String findPasswordProcess(Model model, FindMemberPassword request) {
//        String tempPw = memberService.updatePassword(request);
//        if (tempPw == null) {
//            model.addAttribute("password", "존재하지 않는 회원입니다.");
//        } else {
//            model.addAttribute("password", tempPw);
//        }
//        return "/completeFindPassword";
//    }
}
