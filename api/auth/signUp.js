export default function(req, res, next) {
  console.log(req.body);

  res.end(JSON.stringify({ reg: 'reg' }));

  return;
};