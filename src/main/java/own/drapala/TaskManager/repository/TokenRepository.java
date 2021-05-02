package own.drapala.TaskManager.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;
import own.drapala.TaskManager.domain.Token;
import own.drapala.TaskManager.domain.User;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the {@link Token} entity.
 */
@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    List<Token> findByUser(User user);

    List<Token> findByTokenDateBefore(LocalDate localDate);
}
