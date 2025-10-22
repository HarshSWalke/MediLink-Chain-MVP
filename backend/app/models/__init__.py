from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    shop_type = Column(String, nullable=False)  # chemist / e-pharma
    email = Column(String, unique=True, nullable=False)
    location = Column(String, nullable=True)
    inventory = relationship("Inventory", back_populates="owner")

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    medicine_name = Column(String, nullable=False)
    batch_no = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    expiry_date = Column(Date, nullable=False)

    owner = relationship("User", back_populates="inventory")
