package com.About_Error.repository.error;

import com.About_Error.domain.error.ErrorPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorPostRepository extends JpaRepository<ErrorPost, Long> {
}
