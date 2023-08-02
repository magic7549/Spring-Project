package com.About_Error.dto.error;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ErrorPostViewResponseDto {

    private String title;
    private String content;
    private String writer;
    private Timestamp postDate;

    @Builder
    public ErrorPostViewResponseDto(String title, String content, String writer, Timestamp postDate) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.postDate = postDate;
    }
}
