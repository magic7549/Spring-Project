package com.About_Error.dto.quiz;

import com.About_Error.domain.quiz.QuizList;
import lombok.Builder;
import lombok.Getter;

@Getter
public class QuizListResponseDto {

    private Long idx;
    private String title;
    private String title_img;
    private String content;

    @Builder
    public QuizListResponseDto(QuizList quizList) {
        this.idx = quizList.getIdx();
        this.title = quizList.getTitle();
        this.title_img = quizList.getTitle_img();
        this.content = quizList.getContent();
    }
}
