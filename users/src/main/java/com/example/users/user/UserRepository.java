package com.example.users.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByGender(String gender);

    User deleteByUsername(String username);

//    User findById(Long id);


}
