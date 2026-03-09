# from fastapi import FastAPI,Depends,HTTPException
# from sqlalchemy import Integer,Column,create_engine,String
# from pydantic import BaseModel,Field



# app = FastAPI(
#     title="This is my project setup only",
#     description="This is my first project in fast api",
#     version="1.0.0"
#               )


# @app.get("/")
# def home():
#     return {
#         "id":1,
#         "name":"Deepak"}



from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy import create_engine,Integer,String,Column
from sqlalchemy.orm import declarative_base,sessionmaker,session
from pydantic import BaseModel,Field
from typing import List,Optional



# ============================================================
# BEGINNER SINGLE-FILE PROJECT
# CRUD with FastAPI + SQLAlchemy (Sync version)
# ------------------------------------------------------------
# What this teaches:
# 1. FastAPI app creation
# 2. SQLAlchemy model creation
# 3. SQLite database connection
# 4. Dependency injection for DB session
# 5. CRUD APIs: Create, Read, Update, Delete
# 6. Basic response and error handling
# 7. Async overview at the bottom (concept only)
# ============================================================

# ============================================================
# DATABASE SETUP
# ============================================================
DATABASE_URL = "sqlite:///./students.db"

# check_same_thread=False is needed for SQLite with FastAPI
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ============================================================
# SQLALCHEMY MODEL (DB TABLE)
# ============================================================
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    course = Column(String, nullable=False)


# Create tables
Base.metadata.create_all(bind=engine)


# ============================================================
# PYDANTIC SCHEMAS
# ============================================================
class StudentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str
    course: str = Field(..., min_length=2, max_length=100)


class StudentUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    email: Optional[str] = None
    course: Optional[str] = Field(default=None, min_length=2, max_length=100)


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    course: str

    class Config:
        from_attributes = True


# ============================================================
# FASTAPI APP
# ============================================================
app = FastAPI(title="Beginner CRUD with FastAPI + SQLAlchemy")


# ============================================================
# DATABASE DEPENDENCY
# ============================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================================
# ROOT
# ============================================================
@app.get("/")
def home():
    return {
        "message": "FastAPI + SQLAlchemy CRUD is running",
        "practice_endpoints": [
            "POST /students",
            "GET /students",
            "GET /students/{id}",
            "PUT /students/{id}",
            "DELETE /students/{id}"
        ]
    }


# ============================================================
# CREATE STUDENT
# ============================================================
@app.post("/students", response_model=StudentResponse, status_code=201)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    # Check duplicate email
    existing_student = db.query(Student).filter(Student.email == student.email).first()
    if existing_student:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_student = Student(
        name=student.name,
        email=student.email,
        course=student.course
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


# ============================================================
# READ ALL STUDENTS
# ============================================================
@app.get("/students", response_model=List[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students


# ============================================================
# READ ONE STUDENT BY ID
# ============================================================
@app.get("/students/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


# ============================================================
# UPDATE STUDENT
# ============================================================
@app.put("/students/{student_id}", response_model=StudentResponse)
def update_student(student_id: int, student_data: StudentUpdate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # If email is being updated, check duplicate
    if student_data.email and student_data.email != student.email:
        duplicate_email = db.query(Student).filter(Student.email == student_data.email).first()
        if duplicate_email:
            raise HTTPException(status_code=400, detail="Email already exists")

    # Update only provided fields
    if student_data.name is not None:
        student.name = student_data.name
    if student_data.email is not None:
        student.email = student_data.email
    if student_data.course is not None:
        student.course = student_data.course

    db.commit()
    db.refresh(student)
    return student


# ============================================================
# DELETE STUDENT
# ============================================================
@app.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()
    return {"message": f"Student with id {student_id} deleted successfully"}


# ============================================================
# HOW TO RUN
# ============================================================
# 1. Install packages:
#    pip install fastapi uvicorn sqlalchemy pydantic
#
# 2. Run server:
#    uvicorn fastapi_sqlalchemy_crud_beginner_single_file:app --reload
#
# 3. Open Swagger UI:
#    http://127.0.0.1:8000/docs
#
# 4. Test CRUD from browser itself using Swagger
#

# ============================================================
# SAMPLE TEST DATA
# ============================================================
# {
#   "name": "Deepak",
#   "email": "deepak@example.com",
#   "course": "FastAPI"
# }


# ============================================================
# SYNC vs ASYNC OVERVIEW (BEGINNER UNDERSTANDING)
# ============================================================
# This file uses SYNC SQLAlchemy because it is easier for beginners.
#
# SYNC FLOW:
# - def endpoint(...)
# - normal create_engine(...)
# - normal SessionLocal()
# - easier to understand and practice CRUD first
#
# ASYNC FLOW (advanced next step):
# - async def endpoint(...)
# - create_async_engine(...)
# - AsyncSession
# - await db.execute(...)
# - usually used for higher concurrency apps
#
# Beginner rule:
# 1. Learn CRUD in sync first
# 2. Then move to async version
#
# Async example idea:
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# DATABASE_URL = "sqlite+aiosqlite:///./students.db"
# async_engine = create_async_engine(DATABASE_URL)
# AsyncSessionLocal = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)
#
# @app.get("/students-async")
# async def get_students_async(db: AsyncSession = Depends(get_async_db)):
#     result = await db.execute(select(Student))
#     return result.scalars().all()
#
# Keep that as your next practice after understanding this file.








