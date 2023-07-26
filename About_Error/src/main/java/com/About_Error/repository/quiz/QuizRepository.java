package com.About_Error.repository.quiz;

import com.About_Error.domain.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByQuizTitle(String title);
}
