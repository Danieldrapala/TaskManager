package own.drapala.TaskManager.domain;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "board")
public class Board {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "board_id")
        private Long id;
        @NotEmpty(message = "{board.name.not.empty}")
        @Column(length = 1200)
        @Size(max = 1200, message = "{board.name.size}")
        private String name;
        @NotEmpty(message = "{board.card.not.empty}")
        private int cards;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setCards(int cards) {
            this.cards = cards;
        }

        public @NotEmpty(message = "{board.cards.not.empty}")
        int getCards() {
            return cards;
        }

        public Board() {
        }

        public Board(@NotEmpty String name,
                       int cards) {
            this.name = name;
            this.cards = cards;
        }
    }
