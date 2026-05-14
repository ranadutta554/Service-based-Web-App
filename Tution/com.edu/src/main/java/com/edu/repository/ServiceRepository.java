package com.edu.repository;



import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
		List<ServiceEntity> findByCid(int cid);
}