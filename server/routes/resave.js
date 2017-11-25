const runner = (request, response) => {
  request.session.regenerate((err) => console.error(err));
  return response.status(200).json(request.session);
};

export default runner;
