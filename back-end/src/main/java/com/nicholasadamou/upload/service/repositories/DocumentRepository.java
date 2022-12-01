package com.nicholasadamou.upload.service.repositories;

import com.nicholasadamou.upload.service.model.Document;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Repository
public class DocumentRepository {
	private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private final BeanPropertyRowMapper<Document> documentRowMapper = new BeanPropertyRowMapper<>(Document.class);

	public DocumentRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}

	@PostConstruct
	void init() {
		JdbcTemplate jdbcTemplate = namedParameterJdbcTemplate.getJdbcTemplate();
		jdbcTemplate.setResultsMapCaseInsensitive(true);
	}

	@Transactional
	public void upload(Document document) {
		String sql = """
		INSERT INTO documents.document (name, original_file_name, mime_type, extension, data, uploaded_on)
		VALUES (:name, :original_file_name, :mime_type, :extension, :data, CURRENT_TIMESTAMP)
		""";

		Map<String, Object> parameters = document.toMap();

		namedParameterJdbcTemplate.update(sql, parameters);
	}

	public List<Document> getAll() {
		String sql = """
		SELECT *
		FROM documents.document
		""";

		return namedParameterJdbcTemplate.query(sql, (rs, rowNum) -> {
			Document document = new Document();

			document.setId(rs.getInt("id"));
			document.setName(rs.getString("name"));
			document.setOriginalFileName(rs.getString("original_file_name"));
			document.setMimeType(rs.getString("mime_type"));
			document.setExtension(rs.getString("extension"));
			document.setUploadedOn(rs.getTimestamp("uploaded_on"));

			return document;
		}).stream().toList();
	}

	public Document get(int id) {
		String sql = """
		SELECT *
		FROM documents.document
		WHERE id = :id
		""";

		Map<String, Object> parameters = Map.of("id", id);

		return namedParameterJdbcTemplate.queryForObject(sql, parameters, documentRowMapper);
	}

	public void delete(int id) {
		String sql = """
		DELETE FROM documents.document
		WHERE id = :id
		""";

		Map<String, Object> parameters = Map.of("id", id);

		namedParameterJdbcTemplate.update(sql, parameters);
	}
}
