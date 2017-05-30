package ua.nure.pricetag.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import ua.nure.pricetag.entity.User;
import ua.nure.pricetag.exception.ValidationException;
import ua.nure.pricetag.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@EnableWebMvc
public class UserController {

    @Autowired
    private UserService service;

    private ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody String userString, HttpServletRequest request) throws IOException, ValidationException {
        String encoded = URLDecoder.decode(userString, StandardCharsets.UTF_8.toString()).replaceFirst(".$","");
        User user = mapper.readValue(encoded, User.class);
        User loggedIn = service.login(user, request);
        if(Objects.isNull(loggedIn)) {
            throw new ValidationException("Incorrect login or password. Please, double check.");
        }
        return mapper.writeValueAsString(loggedIn);
    }

    @RequestMapping(value = "/exists", method = RequestMethod.GET)
    public String getUser(HttpServletRequest request) throws JsonProcessingException, ValidationException {
        User user = service.getUser(request);
        if(Objects.isNull(user)) {
            throw new ValidationException("Not logged in");
        }
        return mapper.writeValueAsString(user);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletRequest request) {
        service.logout(request);
    }


}
