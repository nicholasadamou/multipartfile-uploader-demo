package com.nicholasadamou.upload.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Licensed Materials - Property of IBM
 * <p>
 * (C) Copyright IBM Corp. 2022. All Rights Reserved.
 * <p>
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
@SpringBootApplication
@EnableScheduling
public class UploadServiceStartup {

	public static void main(String[] args) {
		SpringApplication.run(UploadServiceStartup.class, args);
	}
}
