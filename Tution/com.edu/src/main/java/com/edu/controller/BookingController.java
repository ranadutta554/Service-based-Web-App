package com.edu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.edu.entity.Booking;
import com.edu.service.BookingService;
import com.edu.service.NotificationService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService service;

    @Autowired
    private NotificationService notificationService; // 🔔 NEW

    // ✅ CREATE BOOKING
    @PostMapping("/add")
    public Booking addBooking(@RequestBody Booking booking) {
        return service.saveBooking(booking);
    }

    // ✅ PROVIDER BOOKINGS
    @GetMapping("/provider/{email}")
    public List<Booking> getProviderBookings(@PathVariable String email) {
        return service.getProviderBookings(email);
    }

    // ✅ USER BOOKINGS
    @GetMapping("/user/{email}")
    public List<Booking> getUserBookings(@PathVariable String email) {
        return service.getUserBookings(email);
    }

    // ✅ UPDATE STATUS (Provider Accept / Complete)
    @PutMapping("/status/{id}")
    public Booking updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    // 🔥 UPDATED CANCEL (NO DELETE)
    @PostMapping("/cancel/{id}")
    public String cancelBooking(@PathVariable Long id) {

        Booking booking = service.getBookingById(id);

        if (booking == null) {
            return "Booking not found";
        }

        String status = booking.getStatus();

        if ("PENDING".equals(status) || "ACCEPTED".equals(status)) {

            booking.setStatus("CANCELLED");

            // 🔥 FIXED HERE
            service.updateBooking(booking);

            notificationService.notifyProviderCancel(
                booking.getProviderEmail(),
                booking.getUserEmail(),
                booking.getServiceName()
            );

            return "Cancelled successfully";
        }

        return "Cannot cancel";
    }
}