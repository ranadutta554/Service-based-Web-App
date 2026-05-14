package com.edu.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
	@GetMapping("/")
	public String welcome() {
		return "<h1>Welcome To Education App</h1>";
	}

}
