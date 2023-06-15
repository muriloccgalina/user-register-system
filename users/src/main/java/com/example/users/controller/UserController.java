package com.example.users.controller;

import com.example.users.user.User;
import com.example.users.user.UserDto;
import com.example.users.user.UserRepository;
import com.example.users.user.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public UserResponseDto create(@RequestBody UserDto data){
        User user = new User(data);
        repository.save(user);
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<UserResponseDto> getAll(){
        List<UserResponseDto> usersList = repository.findAll().stream().map(UserResponseDto::new).toList();
        return usersList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/filter")
    public List<UserResponseDto> getByFilter(@RequestParam Optional<String> gender){
        List<UserResponseDto> usersList;
        if(gender.isEmpty()) {
            usersList = repository.findByGender(gender.orElse("")).stream()
                    .map(UserResponseDto::new).toList();
        } else {
            throw new RuntimeException("Request filter error!");
        }
        return usersList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/delete")
    public UserResponseDto delete(@RequestBody User data) {
        Optional<User> optionalUser = repository.findById(data.getId());
        User user = optionalUser.orElse(new User());
        repository.deleteByUsername(data.getUsername());
        UserResponseDto response = new UserResponseDto(user);
        return response;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/update")
    public UserResponseDto update(@RequestBody User data) {
        Optional<User> optionalUser = repository.findById(data.getId());
        if (optionalUser.isPresent()) {
            repository.save(data);
        } else {
            throw new RuntimeException("User doesn't exist!");
        }
        UserResponseDto response = new UserResponseDto(data);
        return response;
    }
}
