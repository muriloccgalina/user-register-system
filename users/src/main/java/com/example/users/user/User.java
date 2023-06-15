package com.example.users.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private String username;
    private String email;
    private Long phone;
    private String gender;
    private String password;
    private Long birthdate;
    private String picture;

    public User(UserDto data){
        this.name = data.name();
        this.username = data.username();
        this.email = data.email();
        this.phone = data.phone();
        this.gender = data.gender();
        this.password = data.password();
        this.birthdate= data.birthdate();
        this.picture = data.picture();
    }
}
