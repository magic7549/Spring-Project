package com.About_Error.service;

import com.About_Error.domain.QuizList;
import com.About_Error.repository.QuizListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizListRepository quizListRepository;

    public List<QuizList> findAll() {
        return quizListRepository.findAll();
    }
}
