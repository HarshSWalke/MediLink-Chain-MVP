from fastapi import APIRouter
from app.utils.blockchain_storage import load_blockchain, save_blockchain
import time, hashlib

router = APIRouter(prefix="/blockchain", tags=["Blockchain"])

from app.utils.qr_generator import generate_qr  # <-- add this import near the top if not already present

@router.post("/add_transaction")
def add_transaction(batch_no: str, medicine_name: str, sender: str, receiver: str):
    # Load the existing blockchain
    chain = load_blockchain()

    # Prepare transaction data
    data = {
        "batch_no": batch_no,
        "medicine_name": medicine_name,
        "sender": sender,
        "receiver": receiver,
        "timestamp": time.time()
    }

    # Add new block
    new_block = chain.add_block(data)
    save_blockchain(chain)

    # Generate a QR code for this batch
    qr_path = generate_qr(batch_no, medicine_name, new_block.hash)

    # Return both blockchain and QR info
    return {
        "message": "Transaction added",
        "block_hash": new_block.hash,
        "qr_path": qr_path
    }


@router.get("/chain")
def get_chain():
    chain = load_blockchain()
    return [block.__dict__ for block in chain.chain]

@router.get("/verify/{batch_no}")
def verify_batch(batch_no: str):
    chain = load_blockchain()
    found_blocks = [b.__dict__ for b in chain.chain if b.data.get("batch_no") == batch_no]
    if not found_blocks:
        return {"status": "Not Found", "valid": False}
    valid = chain.is_chain_valid()
    return {"status": "Found", "valid": valid, "history": found_blocks}
