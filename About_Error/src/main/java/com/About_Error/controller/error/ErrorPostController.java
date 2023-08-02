package com.About_Error.controller.error;

import com.About_Error.domain.error.ErrorPost;
import com.About_Error.dto.error.AddErrorPostRequestDto;
import com.About_Error.dto.error.ErrorPostListResponseDto;
import com.About_Error.dto.error.ErrorPostViewResponseDto;
import com.About_Error.service.error.ErrorPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ErrorPostController {

    private final ErrorPostService errorPostService;

    // 게시글 리스트 조회
    @GetMapping("/error")
    public ResponseEntity ErrorPostFindAll() {
        List<ErrorPostListResponseDto> postListDto = errorPostService.errorPostFindAll()
                .stream()
                .map(ErrorPostListResponseDto::new)
                .toList();

        return ResponseEntity.ok().body(postListDto);
    }

    // 게시글 조회
    @GetMapping("/error/{idx}")
    public ResponseEntity findErrorPostById(@PathVariable("idx") Long idx) {
        ErrorPost errorPost = errorPostService.errorPostFindById(idx);

        ErrorPostViewResponseDto postViewDto = ErrorPostViewResponseDto.builder()
                .title(errorPost.getTitle())
                .content(errorPost.getContent())
                .writer(errorPost.getWriter())
                .postDate(errorPost.getPostDate())
                .build();

        return ResponseEntity.ok().body(postViewDto);
    }

    // 게시글 등록
    @PostMapping("/error/add")
    public ResponseEntity saveErrorPost(@RequestBody AddErrorPostRequestDto dto) {
        return ResponseEntity.ok().body(errorPostService.saveErrorPost(dto));
    }
}
