package com.About_Error.config.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    //private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L; // 30 minutes
    //private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L; // 7 days
    private final JwtProperties jwtProperties;

    //테스트용 access, refresh (시간 매우 짧음)
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 5 * 1000L; // 1s
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 5 * 1000L; // 10s


    public String createAccessToken(String email) {
        long now = (new Date()).getTime();
        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

        return generateToken(email, tokenExpiresIn);
    }

    public String createRefreshToken(String email) {
        long now = (new Date()).getTime();
        Date tokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);

        return generateToken(email, tokenExpiresIn);
    }

    // 토큰 생성
    private String generateToken(String email, Date expire) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put(AUTHORITIES_KEY, "ROLE_USER");

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expire)
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);
        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtProperties.getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getSecretKey()).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
