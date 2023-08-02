package com.About_Error.dto.post;

import com.About_Error.domain.post.Post;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class PostListResponseDto {

    private Long idx;
    private String title;
    private String writer;
    private Timestamp postDate;

    @Builder
    public PostListResponseDto(Post post) {
        this.idx = post.getIdx();
        this.title = post.getTitle();
        this.writer = post.getWriter();
        this.postDate = post.getPostDate();
    }
}
