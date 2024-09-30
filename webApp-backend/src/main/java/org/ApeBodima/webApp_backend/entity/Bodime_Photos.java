package org.ApeBodima.webApp_backend.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bodime_photo")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Bodime_Photos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generates integer IDs
    @Column(name = "photo_id")
    private Integer photoId;

    @ManyToOne
    @JoinColumn(name="bodime_id",nullable=false)
    private Bodime_Detail bodime_details;


    @Column(name = "photo",columnDefinition = "LONGTEXT")
    private String photo;

}
