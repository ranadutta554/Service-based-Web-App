package com.edu.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

	public void notifyProviderCancel(String providerEmail, String userEmail, String serviceName) {

	    System.out.println("🔔 CANCEL NOTIFICATION");
	    System.out.println("Provider: " + providerEmail);
	    System.out.println("User: " + userEmail);
	    System.out.println("Service: " + serviceName);
	}
    }
