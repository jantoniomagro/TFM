-- CREATE and INSERT
CREATE TABLE tap_schema.schemas (
	schema_name   varchar(64),
	utype         varchar(512) NULL,
	description   varchar(512) NULL,
	primary key (schema_name)
);

INSERT INTO tap_schema.schemas (schema_name,description,utype) VALUES
( 'TAP_SCHEMA', 'a special schema to describe a TAP tableset', null );

db.schemas.insert( {
	schema_name: "TAP_SCHEMA",
	utype: null,
	description: "a special schema to describe a TAP tableset"}
);

-- SELECT
SELECT * 
  FROM tap_schema.schemas t 
 WHERE schemas.schema_name = 'TAP_SCHEMA';

db.tables.find({schema_name: "TAP_SCHEMA"});

-- DELETE

DELETE FROM TAP_SCHEMA.SCHEMAS WHERE schemas.schema_name = 'TAP_SCHEMA';

db.tables.remove({schema_name: "TAP_SCHEMA"});

-- UPDATE

UPDATE TAP_SCHEMA.SCHEMAS 
   SET schemas.description = 'desc' 
 WHERE schemas.schema_name = 'TAP_SCHEMA'; 

db.tables.update(
	{schema_name = 'TAP_SCHEMA'},
	{$set: {description = "desc"}},
	{multi:true}
);
