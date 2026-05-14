package com.edu.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;

@Entity
public class RegistrationEntity {
	private String name;
	@Id
	private String email;
	private String pass;
	private long contactno;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public long getContactno() {
		return contactno;
	}
	public void setContactno(long contactno) {
		this.contactno = contactno;
	}
	@Override
	public String toString() {
		return "RegistrationEntity [name=" + name + ", email=" + email + ", pass=" + pass + ", contactno=" + contactno
				+ "]";
	}

	
	
	
	
}
