const timeout = (request, response) => {
  return response.status(200).json({timeout: true});
};

export default timeout;
