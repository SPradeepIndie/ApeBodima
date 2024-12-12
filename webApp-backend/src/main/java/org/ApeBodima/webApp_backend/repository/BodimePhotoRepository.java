

package org.ApeBodima.webApp_backend.repository;

import org.ApeBodima.webApp_backend.entity.Bodime_Photos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BodimePhotoRepository extends JpaRepository<Bodime_Photos, String> {


/*
    List<Bodime_Photos> findByBodime_details(String bodimId);
    @Query("SELECT bp FROM Bodime_Photos bp WHERE bp.bodime_details.bodimId = :bodimId")
    List<Bodime_Photos> findPhotosByBodimeId(@Param("bodimId") String bodimId);
*/

}

