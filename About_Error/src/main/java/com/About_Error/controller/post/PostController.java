package com.About_Error.controller.post;

import com.About_Error.dto.post.AddPostRequestDto;
import com.About_Error.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    // 게시글 등록
    @PostMapping("/post/add")
    public ResponseEntity savePost(@RequestBody AddPostRequestDto dto) {
        return ResponseEntity.ok().body(postService.savePost(dto));
    }
}
