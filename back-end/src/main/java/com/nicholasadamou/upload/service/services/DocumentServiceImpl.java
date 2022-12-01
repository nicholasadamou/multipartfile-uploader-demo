package com.nicholasadamou.upload.service.services;

import com.nicholasadamou.upload.service.model.Document;
import com.nicholasadamou.upload.service.repositories.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import javax.ws.rs.core.Response;

@Component
public class DocumentServiceImpl implements DocumentService {
	Logger logger = LoggerFactory.getLogger(DocumentServiceImpl.class);

	@Autowired
	private DocumentRepository documentRepository;

	@Override
	public Response upload(Document document, MultipartFile file) {
		document.setFile(file);
		document.build();

		logger.info(String.format("Received %s", document));

		documentRepository.upload(document);

		logger.info(String.format("Uploaded %s", document));

		return Response.ok().build();
	}

	@Override
	public Response getAll() {
		return Response.ok(documentRepository.getAll()).build();
	}

	@Override
	public Response get(int id) {
		return Response.ok(documentRepository.get(id)).build();
	}

	@Override
	public Response delete(int id) {
		documentRepository.delete(id);

		logger.info(String.format("Deleted document with id %s", id));

		return Response.ok().build();
	}
}
