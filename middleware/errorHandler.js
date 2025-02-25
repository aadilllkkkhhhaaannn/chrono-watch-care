const errorHandler = (err, req, res, next) => {
  // Check karen ki headers pehle hi send ho chuke hain ya nahi
  if (res.headersSent) {
    return next(err); // Agar ho chuke hain to next middleware ko call karen
  }

  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    error: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
