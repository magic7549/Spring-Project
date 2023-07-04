package com.About_Error.controller;

import com.About_Error.dto.AddMemberRequest;
import com.About_Error.dto.FindMemberEmail;
import com.About_Error.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String loginProcess() {

        return "main";
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

    @GetMapping("/findEmail")
    public String findEmail() {
        return "/findEmail";
    }

    @PostMapping("/findEmail")
    public String findEmailProcess(Model model, FindMemberEmail request) {
        model.addAttribute("email", memberService.findMemberEmail(request));
        return "/completeFindEmail";
    }

    @GetMapping("/findPassword")
    public String findPassword() {
        return "/findPassword";
    }

    @PostMapping("/findPassword")
    public String findPasswordProcess(Model model, FindMemberEmail request) {
        return "/completeFindPassword";
    }
}
