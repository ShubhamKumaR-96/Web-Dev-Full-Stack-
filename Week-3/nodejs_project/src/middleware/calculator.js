const calculator = (req, res, next) => {
    // Get operation and numbers from URL parameters
    const operation = req.params.operation.toLowerCase();
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
  
    // Validate inputs
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Invalid numbers provided' });
    }
  
    // Define supported operations
    const operations = {
      sum: (a, b) => a + b,
      multiply: (a, b) => a * b,
      subtract: (a, b) => a - b,
      divide: (a, b) => {
        if (b === 0) {
          throw new Error('Division by zero');
        }
        return a / b;
      },
    };
  
    // Check if the operation is supported
    if (!operations[operation]) {
      return res.status(400).json({ error: `Unsupported operation: ${operation}` });
    }
  
    try {
      // Perform the calculation
      const result = operations[operation](a, b);
      res.json({ ans: result });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  
    // Call next() if this is meant to be middleware
    next();
  };
  
  module.exports = calculator;