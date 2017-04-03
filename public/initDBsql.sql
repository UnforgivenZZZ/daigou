CREATE TABLE items(
dir varchar(20) NOT NULL,
picture varchar(255) NOT NULL,
price REAL NOT NULL,
des TEXT,
post_date TIMESTAMP NOT NULL,
CONSTRAINT pk_item PRIMARY KEY (dir) 
);

-- -- !!! for final release, picture should not be part of primiary KEY
-- or, only dir is PRIMARY KEY

CREATE TABLE imgs(
	dir varchar(20) NOT NULL,
	picture varchar(255) NOT NULL,
	CONSTRAINT item_pic PRIMARY KEY(dir,picture)
);