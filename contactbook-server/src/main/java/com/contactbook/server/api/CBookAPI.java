package com.contactbook.server.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contactbook.server.domain.APIResp;
import com.contactbook.server.domain.Contact;

@RestController
@RequestMapping("/api/v1/contactbook/")
public class CBookAPI {

	@Autowired
	private CBookDB cbookDB;

	@GetMapping("init")
	public ResponseEntity<APIResp> init() {
		APIResp apiResp = new APIResp();
		cbookDB.init();
		apiResp.status = "Init Success";
		return new ResponseEntity<>(apiResp, HttpStatus.CREATED);
	}

	@GetMapping("all")
	public List<Contact> getAll() {
		return cbookDB.getAll();
	}

	@PostMapping("new")
	public ResponseEntity<APIResp> add(@RequestBody Contact contact) {
		APIResp apiResp = new APIResp();
		boolean status = cbookDB.add(contact);
		if (status) {
			apiResp.status = "Created";
			return new ResponseEntity<>(apiResp, HttpStatus.CREATED);
		} else {
			apiResp.status = "Failed";
			return new ResponseEntity<>(apiResp, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("{name}")
	public ResponseEntity<?> search(@PathVariable String name) {
		List<Contact> list = cbookDB.search(name);
		if (list.size() > 0) {
			return new ResponseEntity<>(list, HttpStatus.OK);
		} else {
			APIResp apiResp = new APIResp();
			apiResp.status = "No Contacts found with name: " + name;
			return new ResponseEntity<>(apiResp, HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("deleteall")
	public ResponseEntity<?> deleteAll() {
		APIResp apiResp = new APIResp();
		int count = cbookDB.deleteAll();
		if (count > 0) {
			apiResp.status = "Deleted " + count + " Contacts";
			return new ResponseEntity<>(apiResp, HttpStatus.OK);
		} else {
			apiResp.status = "No Contacts found to delete";
			return new ResponseEntity<>(apiResp, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
