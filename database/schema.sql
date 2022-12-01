-- This script will delete everything created in `schema.sql`. This script is
-- also idempotent, you can run it as many times as you would like. Nothing
-- will be dropped if the schema does not exist.

drop schema if exists documents cascade;

drop table if exists documents.document;

create schema documents;

create table documents.document(
	id 				    serial primary key,
	name                text not null,
	original_file_name  text not null,
	mime_type           text not null,
	extension           text not null,
	data                bytea,
	uploaded_on         timestamp default now()
);

comment on table documents.document is 'A document.';
comment on column documents.document.id is 'The primary unique identifier for the document.';
comment on column documents.document.name is 'The name of the document.';
comment on column documents.document.original_file_name is 'The original file name of the document (name + extension).';
comment on column documents.document.mime_type is 'The kind of document.';
comment on column documents.document.extension is 'The extension of the document.';
comment on column documents.document.data is 'The byte data of the document.';
comment on column documents.document.uploaded_on is 'The time this document was uploaded.';
