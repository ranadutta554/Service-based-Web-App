package com.edu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int cid;
  private String cname;
  public Category() {  
	super();
	// TODO Auto-generated constructor stub
  }
  
  public Category(String cname) {
	super();
	this.cname = cname;
  }
  public Category(int cid, String cname) {
	super();
	this.cid = cid;
	this.cname = cname;
  }
  public int getCid() {
	return cid;
  }
  public void setCid(int cid) {
	this.cid = cid;
  }
  public String getCname() {
	return cname;
  }
  public void setCname(String cname) {
	this.cname = cname;
  }
  
  
}