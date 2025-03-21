# Use Python base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Set Python module path
ENV PYTHONPATH=/app/src

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run FastAPI with the correct module path
CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]




