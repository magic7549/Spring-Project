package com.About_Error.controller;

import com.About_Error.dto.AddMemberRequest;
import com.About_Error.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class tempController {

    private final MemberService memberService;

    @GetMapping("/")
    public String mainPage() {
        return "main";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @PostMapping("/signup")
    public String signupProcess(AddMemberRequest request) {
        memberService.save(request);

        return "redirect:/login";
    }

    @GetMapping("/main")
    public String mainHome() {
        return "main";
    }
}
