package com.About_Error.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "quiz_list")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class QuizList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", updatable = false)
    private Long idx;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "title_img", nullable = false)
    private String title_img;

    @Column(name = "content", nullable = false)
    private String content;

    @Builder
    public QuizList(String title, String title_img, String content) {
        this.title = title;
        this.title_img = title_img;
        this.content = content;
    }
}
