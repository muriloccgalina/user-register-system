package com.example.users.user;

public record UserResponseDto (Long id, String name, String username, String gender) {

    public UserResponseDto(User user) {
        this(user.getId(), user.getName(), user.getUsername(), user.getGender());
    }
}
