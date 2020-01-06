let init = (req, res) => {
  res.send(`{
  "subject": "Subject",
  "emailContact" : "email@email.com",
  "text": "Body Mail"
}`);
};

module.exports.init = init;
