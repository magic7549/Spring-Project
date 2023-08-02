package com.About_Error.dto.error;

import com.About_Error.domain.error.ErrorPost;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ErrorPostListResponseDto {

    private Long idx;
    private String title;
    private String writer;
    private Timestamp postDate;

    @Builder
    public ErrorPostListResponseDto(ErrorPost errorPost) {
        this.idx = errorPost.getIdx();
        this.title = errorPost.getTitle();
        this.writer = errorPost.getWriter();
        this.postDate = errorPost.getPostDate();
    }
}
