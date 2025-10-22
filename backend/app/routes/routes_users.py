from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register_user(name: str, shop_type: str, email: str, location: str = None, db: Session = Depends(get_db)):
    user = User(name=name, shop_type=shop_type, email=email, location=location)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "user_id": user.id}

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()
