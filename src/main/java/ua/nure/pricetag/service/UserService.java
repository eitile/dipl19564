package ua.nure.pricetag.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.nure.pricetag.entity.User;
import ua.nure.pricetag.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(User user, HttpServletRequest request) {
        User userByLogin = userRepository.findUserByLogin(user.getLogin());
        if(Objects.nonNull(userByLogin) && userByLogin.getPassword().equals(user.getPassword())) {
            request.getSession().setAttribute("user", userByLogin);
            return userByLogin;
        }
        return null;
    }

    public User getUser(HttpServletRequest request) {
        return (User) request.getSession().getAttribute("user");
    }

    public void logout(HttpServletRequest request) {
        request.getSession().removeAttribute("user");
    }
}
