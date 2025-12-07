
# Database Schema for Bharatiya Youth Parliament (Supabase)

This document outlines the proposed database schema for the BYP website. The tables are designed for use with Supabase and PostgreSQL.

## Table of Contents
1.  [blogs](#1-blogs)
2.  [media](#2-media)
3.  [speakers](#3-speakers)
4.  [committee_members](#4-committee_members)
5.  [contact_submissions](#5-contact_submissions)
6.  [registrations](#6-registrations)

---

### 1. `blogs`
Stores all blog posts for the website.

| Column Name   | Data Type                | Constraints                               | Description                                      |
|---------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`          | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for each blog post.            |
| `title`       | `text`                   | `NOT NULL`                                | The title of the blog post.                      |
| `category`    | `text`                   |                                           | Category of the blog post (e.g., "Leadership").  |
| `description` | `text`                   |                                           | A short summary or excerpt of the post.          |
| `content`     | `text`                   | `NOT NULL`                                | The full content of the blog post (Markdown/HTML).|
| `image_url`   | `text`                   |                                           | URL for the featured image of the post.          |
| `created_at`  | `timestamp with time zone` | `default: now()`                          | Timestamp when the post was created.             |
| `updated_at`  | `timestamp with time zone` | `default: now()`                          | Timestamp when the post was last updated.        |

### 2. `media`
Stores media items like photo galleries and videos.

| Column Name   | Data Type                | Constraints                               | Description                                      |
|---------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`          | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for the media item.            |
| `caption`     | `text`                   | `NOT NULL`                                | The title or caption for the media item.         |
| `description` | `text`                   |                                           | A detailed description of the media content.     |
| `image_url`   | `text`                   |                                           | URL for the primary image or thumbnail.          |
| `video_url`   | `text`                   |                                           | URL for an embedded video (e.g., YouTube).       |
| `event_link`  | `text`                   |                                           | Optional link to a related event or session.     |
| `created_at`  | `timestamp with time zone` | `default: now()`                          | Timestamp when the media item was added.         |

### 3. `speakers`
Stores information about event speakers.

| Column Name   | Data Type                | Constraints                               | Description                                      |
|---------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`          | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for each speaker.              |
| `name`        | `text`                   | `NOT NULL`                                | The full name of the speaker.                    |
| `bio`         | `text`                   |                                           | A short biography of the speaker.                |
| `category`    | `text`                   |                                           | Speaker category (e.g., "Keynote", "Panelist").  |
| `photo_url`   | `text`                   |                                           | URL for the speaker's profile picture.           |
| `designation` | `text`                   |                                           | The speaker's official title or designation.     |
| `created_at`  | `timestamp with time zone` | `default: now()`                          | Timestamp when the speaker was added.            |

### 4. `committee_members`
Stores information about members of various committees.

| Column Name      | Data Type                | Constraints                               | Description                                      |
|------------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`             | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for each member.               |
| `name`           | `text`                   | `NOT NULL`                                | The full name of the committee member.           |
| `role`           | `text`                   |                                           | The member's role or position in the committee.  |
| `photo_url`      | `text`                   |                                           | URL for the member's profile picture.            |
| `committee_type` | `text`                   | `NOT NULL`                                | Type of committee (e.g., "Patron", "Organizing").|
| `created_at`     | `timestamp with time zone` | `default: now()`                          | Timestamp when the member was added.             |

### 5. `contact_submissions`
Stores submissions from the contact form.

| Column Name  | Data Type                | Constraints                               | Description                                      |
|--------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`         | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for each submission.           |
| `name`       | `text`                   | `NOT NULL`                                | The name of the person who submitted the form.   |
| `email`      | `text`                   | `NOT NULL`                                | The email address of the submitter.              |
| `phone`      | `text`                   |                                           | The phone number of the submitter.               |
| `message`    | `text`                   | `NOT NULL`                                | The message content.                             |
| `created_at` | `timestamp with time zone` | `default: now()`                          | Timestamp when the form was submitted.           |

### 6. `registrations`
Stores user registration data from the registration form. This extends the data currently stored in `localStorage`.

| Column Name        | Data Type                | Constraints                               | Description                                      |
|--------------------|--------------------------|-------------------------------------------|--------------------------------------------------|
| `id`               | `uuid`                   | `PRIMARY KEY`, `default: uuid_generate_v4()` | Unique identifier for each registration.         |
| `registration_id`  | `text`                   | `UNIQUE`, `NOT NULL`                      | The user-facing registration ID (e.g., "BYP...").|
| `full_name`        | `text`                   | `NOT NULL`                                | Registrant's full name.                          |
| `email`            | `text`                   | `NOT NULL`                                | Registrant's email.                              |
| `phone`            | `text`                   | `NOT NULL`                                | Registrant's phone number.                       |
| `city`             | `text`                   |                                           | Registrant's city.                               |
| `college`          | `text`                   |                                           | Registrant's college/university.                 |
| `dob`              | `date`                   |                                           | Registrant's date of birth.                      |
| `course`           | `text`                   |                                           | Registrant's academic course.                    |
| `aadhar`           | `text`                   |                                           | Registrant's Aadhar number (consider encryption).|
| `mode_of_presence` | `text`                   | `NOT NULL`                                | "online" or "offline".                           |
| `video_url`        | `text`                   |                                           | URL to uploaded video (for offline mode).        |
| `photo_url`        | `text`                   |                                           | URL to uploaded photo (for offline mode).        |
| `attend_summit`    | `boolean`                |                                           | If they want to attend the Global Summit.        |
| `payment_amount`   | `numeric`                | `NOT NULL`                                | The amount paid.                                 |
| `payment_status`   | `text`                   | `NOT NULL`, `default: 'Completed'`        | Payment status (e.g., "Completed", "Pending").   |
| `payment_date`     | `timestamp with time zone` | `default: now()`                          | Timestamp of the payment.                        |
| `created_at`       | `timestamp with time zone` | `default: now()`                          | Timestamp when the registration was created.     |
