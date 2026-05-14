package com.edu.info.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.info.entity.RegistrationEntity;

public interface RegistrationRepository extends JpaRepository<RegistrationEntity, String>{

}
