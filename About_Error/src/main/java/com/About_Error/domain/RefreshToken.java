package com.About_Error.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "refresh", timeToLive = 60 * 24 * 7)
public class RefreshToken {

    @Id
    private String refreshToken;
    private String email;

    @Builder
    public RefreshToken(String refreshToken, String email) {
        this.refreshToken = refreshToken;
        this.email = email;
    }
}
