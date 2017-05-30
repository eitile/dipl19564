package ua.nure.pricetag.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.nure.pricetag.entity.User;

import java.math.BigInteger;

@Repository
public interface UserRepository extends CrudRepository<User, BigInteger> {

    @Query("SELECT u FROM User u where u.login = :login")
    User findUserByLogin(@Param("login") String login);
}
