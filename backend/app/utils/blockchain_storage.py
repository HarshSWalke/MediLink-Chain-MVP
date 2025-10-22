import json, os
from app.utils.blockchain import Blockchain

CHAIN_FILE = "blockchain_data.json"

def load_blockchain():
    if os.path.exists(CHAIN_FILE):
        with open(CHAIN_FILE, "r") as f:
            data = json.load(f)
            chain = Blockchain()
            chain.chain = []
            for block_data in data:
                from app.utils.blockchain import Block
                block = Block(
                    block_data["index"],
                    block_data["timestamp"],
                    block_data["data"],
                    block_data["previous_hash"],
                )
                chain.chain.append(block)
            return chain
    else:
        return Blockchain()

def save_blockchain(chain):
    with open(CHAIN_FILE, "w") as f:
        json.dump([block.__dict__ for block in chain.chain], f, indent=4)
