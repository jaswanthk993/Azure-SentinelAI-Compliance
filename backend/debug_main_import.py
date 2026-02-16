try:
    from main import app
    print("Imported app successfully")
except Exception as e:
    print(f"Failed to import app: {e}")
