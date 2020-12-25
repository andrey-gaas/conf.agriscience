export default function(req, res, next) {
  console.log(req.url);

  res.end(JSON.stringify({ jopa: 'JOPA' }));

  return;
};
