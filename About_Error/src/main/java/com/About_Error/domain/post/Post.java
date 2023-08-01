package com.About_Error.domain.post;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Table(name = "code_post")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", updatable = false)
    private Long idx;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "writer", nullable = false)
    private String writer;

    @CreatedDate
    @Column(name = "post_date", nullable = false)
    private Timestamp postDate;

    @Builder
    public Post(String title, String content, String writer) {
        this.title = title;
        this.content = content;
        this.writer = writer;
    }
}
