class Classmate {
    constructor(name, courses, interests) {
      this.name = name;
      this.courses = courses || [];
      this.interests = interests || [];
    }
  
    getSharedCourses(other) {
      return this.courses.filter(course => other.courses.includes(course));
    }
  
    getSharedInterests(other) {
      return this.interests.filter(interest => other.interests.includes(interest));
    }
  }
  
  export default Classmate;
  