package com.contactbook.server.api;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.contactbook.server.domain.Contact;

@Service
public class CBookDB {

	@PostConstruct
	public void init() {
		CONTACTS.clear();
		Contact contact = new Contact("Rajesh", "7485748574", "rajesh@demo.com", "Sindhanur, KA");
		CONTACTS.add(contact);
		contact = new Contact("Manjunath", "9685748574", "manjunath@demo.com", "Bellary, KA");
		CONTACTS.add(contact);
		contact = new Contact("Sujith", "8574964569", "sujth@demo.com", "Anantapur, AP");
		CONTACTS.add(contact);
	}

	private static final List<Contact> CONTACTS = new ArrayList<>();

	public boolean add(Contact c) {
		return CONTACTS.add(c);
	}

	public List<Contact> getAll() {
		return CONTACTS;
	}

	public List<Contact> search(String name) {
		List<Contact> list = new ArrayList<>();
		for (Contact c : CONTACTS) {
			if (c.getName().equalsIgnoreCase(name)) {
				list.add(c);
			}
		}
		return list;
	}

	public int deleteAll() {
		int count = CONTACTS.size();
		CONTACTS.clear();
		return count;
	}

}
