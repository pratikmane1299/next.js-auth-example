db.log.insertOne({"message": "Database created."});

db.createUser(
	{
		user: _getEnv("DB_ROOT_USER"),
		pwd: _getEnv("DB_ROOT_PASSWORD"),
		roles: [
			{
					role: "readWrite",
					db: _getEnv("DB_NAME")
			},
		],
	},
);
