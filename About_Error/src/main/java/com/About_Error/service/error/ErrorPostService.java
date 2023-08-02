package com.About_Error.service.error;

import com.About_Error.config.jwt.TokenProvider;
import com.About_Error.domain.error.ErrorPost;
import com.About_Error.dto.error.AddErrorPostRequestDto;
import com.About_Error.repository.error.ErrorPostRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ErrorPostService {

    private final ErrorPostRepository errorPostRepository;
    private final TokenProvider tokenProvider;

    // 게시글 리스트 조회
    public List<ErrorPost> errorPostFindAll() {
        return errorPostRepository.findAll();
    }

    // 게시글 조회
    public ErrorPost errorPostFindById(Long idx) {
        return errorPostRepository.findById(idx).get();
    }

    // 게시글 등록
    public Long saveErrorPost(AddErrorPostRequestDto dto) {
        Claims claims = tokenProvider.parseClaims(dto.getAccessToken());

        return errorPostRepository.save(ErrorPost.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(claims.getSubject())
                .build()).getIdx();
    }
}
