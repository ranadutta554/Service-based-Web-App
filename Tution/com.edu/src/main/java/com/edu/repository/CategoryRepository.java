package com.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.edu.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}