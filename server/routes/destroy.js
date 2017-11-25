const runner = (request, response) => {
  const sessionId = request.session.id;
  request.session.destroy((err) => console.error(err));
  return response.status(200).json({sessionId});
};

export default runner;
