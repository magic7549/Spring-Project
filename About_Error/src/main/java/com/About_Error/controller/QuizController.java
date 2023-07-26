package com.About_Error.controller;

import com.About_Error.dto.quiz.QuizListResponseDto;
import com.About_Error.dto.quiz.QuizResponseDto;
import com.About_Error.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class QuizController {

    private final QuizService quizService;

    // 퀴즈 목록 반환
    @GetMapping("/quizList")
    public ResponseEntity<List<QuizListResponseDto>> findAllQuizList() {
        List<QuizListResponseDto> quizListDto = quizService.findAllQuizList()
                .stream()
                .map(QuizListResponseDto::new)
                .toList();

        return ResponseEntity.ok().body(quizListDto);
    }

    // 퀴즈 반환
    @GetMapping("/quizList/{idx}")
    public ResponseEntity findByQuizTitle(@PathVariable("idx") Long idx) {
        String title = quizService.findQuizTitle(idx);

        // dto로 변환
        List<QuizResponseDto> quizDto = quizService.findByQuizTitle(title)
                .stream()
                .map(QuizResponseDto::new)
                .toList();

        return ResponseEntity.ok().body(quizDto);
    }
}
