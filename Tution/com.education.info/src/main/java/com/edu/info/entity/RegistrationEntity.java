package com.edu.info.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RegistrationEntity {
	private String name;
	@Id
	private String email;
	
	private int regno;
	private String pass;
	private long contactno;
	private int serviceId;
	public RegistrationEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RegistrationEntity(String name, String email, int regno, String pass, long contactno, int serviceId) {
		super();
		this.name = name;
		this.email = email;
		this.regno = regno;
		this.pass = pass;
		this.contactno = contactno;
		this.serviceId = serviceId;
	}
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
	public int getRegno() {
		return regno;
	}
	public void setRegno(int regno) {
		this.regno = regno;
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
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	@Override
	public String toString() {
		return "RegistrationEntity [name=" + name + ", email=" + email + ", regno=" + regno + ", pass=" + pass
				+ ", contactno=" + contactno + ", serviceId=" + serviceId + "]";
	}
	
	
	
}
