from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from app.database import SessionLocal
from app.models import Inventory

router = APIRouter(prefix="/inventory", tags=["Inventory"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add")
def add_inventory(user_id: int, medicine_name: str, batch_no: str, quantity: int, expiry_date: date, db: Session = Depends(get_db)):
    item = Inventory(user_id=user_id, medicine_name=medicine_name, batch_no=batch_no, quantity=quantity, expiry_date=expiry_date)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"message": "Inventory added successfully", "inventory_id": item.id}

@router.get("/{user_id}")
def get_user_inventory(user_id: int, db: Session = Depends(get_db)):
    return db.query(Inventory).filter(Inventory.user_id == user_id).all()
