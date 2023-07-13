db = db.getSiblingDB('mandb')

db.createCollection('groups')
db.createCollection('lecturers')
db.createCollection('students')
db.createCollection('subjects')
db.createCollection('sign_requests')
