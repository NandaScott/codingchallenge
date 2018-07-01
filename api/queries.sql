CREATE TABLE root_table (
    id INTEGER PRIMARY KEY,
    factory_name VARCHAR(50),
    number_of_children INTEGER
);

CREATE TABLE factory_child (
    id INTEGER PRIMARY KEY,
    parent_factory INTEGER,
    number_value INTEGER,
    FOREIGN KEY (parent_factory) REFERENCES root_table(id)
);

SELECT factory_child.number_value
FROM factory_child, root_table
WHERE factory_child.parent_factory == root_table.id;