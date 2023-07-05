package com.About_Error.controller;

import com.About_Error.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class tempController {

    private final MemberService memberService;

    @GetMapping("/")
    public String mainPage() {
        return "main";
    }

    @GetMapping("/main")
    public String mainHome() {
        return "main";
    }

    @GetMapping("/term")
    public String termPage() {
        return "term";
    }

}
