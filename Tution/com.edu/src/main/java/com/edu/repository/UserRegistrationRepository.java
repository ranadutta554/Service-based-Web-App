package com.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.entity.UserRegistrationEntity;

public interface UserRegistrationRepository extends JpaRepository<UserRegistrationEntity, String> {

    UserRegistrationEntity findByEmail(String email);
}