package com.About_Error.controller;

import com.About_Error.dto.QuizListResponseDto;
import com.About_Error.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/quizList")
    public ResponseEntity<List<QuizListResponseDto>> findAllQuizList() {
        List<QuizListResponseDto> quizListDto = quizService.findAll()
                .stream()
                .map(QuizListResponseDto::new)
                .toList();

        return ResponseEntity.ok().body(quizListDto);
    }
}
