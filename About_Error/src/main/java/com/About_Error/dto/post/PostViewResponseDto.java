package com.About_Error.dto.post;

import com.About_Error.domain.post.Post;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class PostViewResponseDto {

    private String title;
    private String content;
    private String writer;
    private Timestamp postDate;

    @Builder
    public PostViewResponseDto(String title, String content, String writer, Timestamp postDate) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.postDate = postDate;
    }
}
