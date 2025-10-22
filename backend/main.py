from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import routes_users, routes_inventory

app = FastAPI(title="MediLink Chain Backend")

# Create DB tables
Base.metadata.create_all(bind=engine)

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/ping")
def ping():
    return {"message": "pong from MediLink backend"}

# Include new routes
app.include_router(routes_users.router)
app.include_router(routes_inventory.router)
