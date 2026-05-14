//package com.edu.repository;
//
//import java.util.List;
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.edu.entity.Booking;
//
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//
//    // ✅ fetch bookings by email
//    List<Booking> findByUserEmail(String userEmail);
//    List<Booking> findByProviderEmail(String email);
//}


package com.edu.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(String userEmail);

    List<Booking> findByProviderEmail(String providerEmail);

    // 🔥 prevent duplicate booking
    List<Booking> findByServiceIdAndScheduledDateAndStatusIn(
        Long serviceId,
        LocalDateTime scheduledDate,
        List<String> statuses
    );
}