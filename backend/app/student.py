from pymongo import MongoClient
import bcrypt

uri = "mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/"
client = MongoClient(uri)

db = client["CLASSLINK"]
students = db["STUDENTS"]
courses = db["COURSES"]

class Student: 
    # constructor for Student class. Takes in first name, last name, username, and password
    def __init__(self, firstName, lastName, email, password, myCourses, myInterests):
        self.email = email
        self.first_name = firstName
        self.last_name = lastName
        self.courses = myCourses or []
        self.interests = myInterests or []
        self.myPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        if myCourses is not None:
            self.my_courses = myCourses
        else:
            self.my_courses = []
        
        if myInterests:
            self.my_interests = myInterests
        else:
            self.my_interests = []
        # self.myCourses = course if courses is not None else []  -- will add later
        #hashes password
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        password = "" # erases password in Student class for security - still exists in database
        
        # checks if student already exists - might not need later
        if students.find_one({"email": email}):
            print("Account already exists")
        else:
            students.insert_one({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "passwordHashed": hashed,
                "courseIds": myCourses,
                "interests": myInterests,
                "matches": []
            })

