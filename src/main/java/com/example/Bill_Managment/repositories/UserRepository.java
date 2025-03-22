package com.example.Bill_Managment.repositories;

import com.example.Bill_Managment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
