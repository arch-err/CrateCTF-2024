# Use the official Bun image as base
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy application files
COPY index.js .

# Set environment variables (if needed)
ENV FLAG="cratectf{test_flag}"
USER bun

# Command to run the application
CMD ["bun", "run", "index.js"]
