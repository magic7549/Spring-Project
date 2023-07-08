package com.About_Error.domain;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "refreshes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class RefreshToken {

    @Id
    @Column(name = "refresh")
    private String refresh;

    @Column(name = "email")
    private String email;

    @Builder
    public RefreshToken(String refresh, String email) {
        this.refresh = refresh;
        this.email = email;
    }
}
