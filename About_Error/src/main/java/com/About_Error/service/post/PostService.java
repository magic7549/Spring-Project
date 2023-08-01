package com.About_Error.service.post;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.post.Post;
import com.About_Error.dto.post.AddPostRequestDto;
import com.About_Error.repository.post.PostRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final TokenProvider tokenProvider;

    // 게시글 등록
    public Long savePost(AddPostRequestDto dto) {
        Claims claims = tokenProvider.parseClaims(dto.getAccessToken());

        return postRepository.save(Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(claims.getSubject())
                .build()).getIdx();
    }
}
