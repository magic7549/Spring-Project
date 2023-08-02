package com.About_Error.controller.post;

import com.About_Error.domain.post.Post;
import com.About_Error.dto.post.AddPostRequestDto;
import com.About_Error.dto.post.PostListResponseDto;
import com.About_Error.dto.post.PostViewResponseDto;
import com.About_Error.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    // 게시글 리스트 조회
    @GetMapping("/post")
    public ResponseEntity postFindAll() {
        List<PostListResponseDto> postListDto = postService.postFindAll()
                .stream()
                .map(PostListResponseDto::new)
                .toList();

        return ResponseEntity.ok().body(postListDto);
    }

    // 게시글 조회
    @GetMapping("/post/{idx}")
    public ResponseEntity findPost(@PathVariable("idx") Long idx) {
        Post post = postService.postFind(idx);

        PostViewResponseDto postViewDto = PostViewResponseDto.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .writer(post.getWriter())
                .postDate(post.getPostDate())
                .build();

        return ResponseEntity.ok().body(postViewDto);
    }

    // 게시글 등록
    @PostMapping("/post/add")
    public ResponseEntity savePost(@RequestBody AddPostRequestDto dto) {
        return ResponseEntity.ok().body(postService.savePost(dto));
    }
}
