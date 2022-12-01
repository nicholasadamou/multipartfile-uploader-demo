package com.nicholasadamou.upload.service.services;

import com.nicholasadamou.upload.service.model.Document;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RestController
@RequestMapping("/document")
public interface DocumentService {
	@CrossOrigin(methods = RequestMethod.POST)
	@PostMapping(path = "/", consumes = MediaType.MULTIPART_FORM_DATA)
	Response upload(@RequestPart @Valid Document document, @RequestPart MultipartFile file);

	@CrossOrigin(methods = RequestMethod.GET)
	@GetMapping(path = "/")
	Response getAll();

	@CrossOrigin(methods = RequestMethod.GET)
	@GetMapping(path = "/{id}")
	Response get(@PathVariable int id);

	@CrossOrigin(methods = RequestMethod.DELETE)
	@DeleteMapping(path = "/{id}")
	Response delete(@PathVariable int id);
}
