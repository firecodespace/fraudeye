def detect_fraud(transaction: dict, db):
    return transaction.get("amount", 0) > 7000000 