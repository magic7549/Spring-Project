package com.About_Error.service.quiz;

import com.About_Error.domain.quiz.Quiz;
import com.About_Error.domain.quiz.QuizList;
import com.About_Error.repository.quiz.QuizListRepository;
import com.About_Error.repository.quiz.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizListRepository quizListRepository;
    private final QuizRepository quizRepository;

    // 퀴즈 목록 조회
    public List<QuizList> findAllQuizList() {
        return quizListRepository.findAll();
    }
    
    // 인덱스로 퀴즈 title 찾기
    public String findQuizTitle(Long idx) {
        return quizListRepository.findById(idx).get().getTitle();
    }

    // 퀴즈 제목으로 퀴즈 찾기
    public List<Quiz> findByQuizTitle(String title) {
        return quizRepository.findByQuizTitle(title);
    }
}
