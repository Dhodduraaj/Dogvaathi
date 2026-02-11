package com.example.dogvaathi.controller;

import com.example.dogvaathi.model.User;
import com.example.dogvaathi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // SIGNUP
    @PostMapping("/signup")
    public String registerUser(@RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken!";
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered!";
        }

        userRepository.save(user);
        return "User registered successfully!";
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        return ResponseEntity.ok(user.getRole());
    }




}
