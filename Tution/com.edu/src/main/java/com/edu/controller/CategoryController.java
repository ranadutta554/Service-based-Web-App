package com.edu.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entity.Category;
import com.edu.service.CategoryService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Category API", description = "Category Management APIs")

@RequestMapping("/api")
@RestController

public class CategoryController {

  @Autowired
  private CategoryService catservice;

  
  
 
  @PostMapping("/add")
  public Category savCategory(@RequestBody Category c) {
    return catservice.saveCategory(c);
  }

  @GetMapping("/hi")
  public String Welcome() {
    return "API IS WORKING";
  }

  @GetMapping("/fetch")
  public List<Category> getAllCategories() {
    return catservice.fetchAllCategories();
  }
  @GetMapping("/fetch/{cid}")
  public ResponseEntity<?>  getfiddetails(@PathVariable int cid)
  {
    
    Category c1=catservice.fetchCategoryByCid(cid);
    if(c1!=null) {
      return ResponseEntity.ok(c1);
    }else {
      String em="Data not Found";
      return new ResponseEntity<>(em,HttpStatus.NOT_FOUND);
    }
    
    
  }
  @PutMapping("/update")
  public ResponseEntity<?>  UpdateByCid(@RequestBody Category c)
  {
    
    Category c1=catservice.fetchCategoryByCid(c.getCid());
    if(c1!=null) {
      Category c2=catservice.UpdateByCid(c);
      return ResponseEntity.ok(c2);
    }else {
      String em="Data not Found";
      return new ResponseEntity<>(em,HttpStatus.NOT_FOUND);
    }
    
    
  }
  
  @DeleteMapping("/delete/{cid}")
  public ResponseEntity<?> deleteByCid(@PathVariable int cid) {

      Category c1 = catservice.fetchCategoryByCid(cid);

      if (c1 != null) {
          catservice.deleteByCid(cid);
          return ResponseEntity.ok("deleted");
      } else {
          String em = "Data not Found";
          return new ResponseEntity<>(em, HttpStatus.NOT_FOUND);
      }
  }

}