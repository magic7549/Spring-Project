package com.About_Error.dto.quiz;


import com.About_Error.domain.quiz.Quiz;
import lombok.Getter;

@Getter
public class QuizResponseDto {

    private String quizTitle;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private int answer;

    public QuizResponseDto(Quiz quiz) {
        this.quizTitle = quiz.getQuizTitle();
        this.question = quiz.getQuestion();
        this.option1 = quiz.getOption1();
        this.option2 = quiz.getOption2();
        this.option3 = quiz.getOption3();
        this.option4 = quiz.getOption4();
        this.answer = quiz.getAnswer();
    }
}
