package com.nicholasadamou.upload.service.model;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Document {
	private Integer id;

	private MultipartFile file;

	private String mimeType;

	private String originalFileName;

	private String name;

	private String extension;
	private byte[] data;

	private int length;

	private Timestamp uploadedOn;

	public Document build() {
		this.buildOriginalFileName();
		this.buildName();
		this.buildExtension();
		this.buildMimeType();
		this.buildData();
		this.buildLength();

		return this;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean hasId() {
		return id != null;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public String getOriginalFileName() {
		return originalFileName;
	}

	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public void setUploadedOn(Timestamp uploadedOn) {
		this.uploadedOn = uploadedOn;
	}

	public Timestamp getUploadedOn() {
		return uploadedOn;
	}

	private void buildOriginalFileName() {
		this.originalFileName = Objects.requireNonNull(this.getFile().getOriginalFilename()).trim();
	}

	private void buildName() {
		this.name = FilenameUtils.getBaseName(this.getOriginalFileName());
	}

	private void buildExtension() {
		String extension = FilenameUtils.getExtension(this.getOriginalFileName());

		Pattern pattern =
				Pattern.compile(
						"^(xls[xmb]|zip|docx?|pptx?|txt|pdf|csv|print)$", Pattern.CASE_INSENSITIVE);

		Matcher matcher = pattern.matcher(extension);

		if (matcher.find()) {
			this.extension = extension;
		} else {
			throw new RuntimeException("File extension not allowed");
		}
	}

	private void buildMimeType() {
		this.mimeType = this.getFile().getContentType();
	}

	private void buildData() {
		try {
			this.data = this.getFile().getBytes();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void buildLength() {
		this.length = this.data.length;
	}

	@Override
	public String toString() {
		return String.format(
				"Document [mimeType=%s, originalFileName=%s, name=%s, extension=%s, length=%s]",
				mimeType, originalFileName, name, extension, length);
	}

	public Map<String, Object> toMap() {
		Map<String, Object> parameters = new HashMap<>();

		parameters.put("name", this.getName());

		parameters.put("original_file_name", this.getOriginalFileName());

		parameters.put("mime_type", this.getMimeType());

		parameters.put("extension", this.getExtension());

		parameters.put("data", this.getData());

		return parameters;
	}
}
